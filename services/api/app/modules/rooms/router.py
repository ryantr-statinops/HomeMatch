from math import ceil
from typing import Annotated

from fastapi import APIRouter, Depends, Path, Query

from app.common.errors import ApiError
from app.common.schemas import DataResponse, ErrorResponse
from app.config.settings import Settings, get_settings
from app.integrations.supabase.client import create_supabase_client
from app.modules.auth.dependencies import require_staff
from app.modules.auth.schemas import AuthenticatedActor
from app.modules.rooms.mapper import map_room_detail, map_room_summary
from app.modules.rooms.repository import (
    RoomRepository,
    SupabaseRoomRepository,
)
from app.modules.rooms.schemas import (
    RoomDetail,
    RoomListMeta,
    RoomStatus,
    RoomSummary,
)

router = APIRouter(prefix="/admin/rooms", tags=["admin-rooms"])


def get_room_repository(
    settings: Annotated[Settings, Depends(get_settings)],
) -> RoomRepository:
    return SupabaseRoomRepository(
        create_supabase_client(settings, privileged=True)
    )


@router.get(
    "",
    response_model=DataResponse[list[RoomSummary]],
    responses={
        401: {"model": ErrorResponse},
        403: {"model": ErrorResponse},
    },
)
def list_admin_rooms(
    _actor: Annotated[AuthenticatedActor, Depends(require_staff)],
    repository: Annotated[RoomRepository, Depends(get_room_repository)],
    search: Annotated[str | None, Query(max_length=100)] = None,
    status: Annotated[RoomStatus | None, Query()] = None,
    area: Annotated[str | None, Query(max_length=100)] = None,
    page: Annotated[int, Query(ge=1)] = 1,
    page_size: Annotated[int, Query(ge=1, le=50)] = 12,
) -> DataResponse[list[RoomSummary]]:
    legacy_status = {
        RoomStatus.ACTIVE: "Trống",
        RoomStatus.RENTED: "Đã thuê",
        RoomStatus.HIDDEN: "Ẩn",
    }.get(status)
    room_page = repository.list_rooms(
        search=search,
        status=legacy_status,
        archived=True if status is RoomStatus.ARCHIVED else (
            False if status is not None else None
        ),
        area=area,
        offset=(page - 1) * page_size,
        limit=page_size,
    )
    image_urls = repository.get_image_urls(
        [
            str(row.get("hinhanhchinh") or "")
            for row in room_page.rows
        ]
    )
    meta = RoomListMeta(
        page=page,
        page_size=page_size,
        total=room_page.total,
        total_pages=ceil(room_page.total / page_size),
    )
    return DataResponse(
        data=[
            map_room_summary(row, image_urls)
            for row in room_page.rows
        ],
        meta=meta.model_dump(),
    )


@router.get(
    "/{room_id}",
    response_model=DataResponse[RoomDetail],
    responses={
        401: {"model": ErrorResponse},
        403: {"model": ErrorResponse},
        404: {"model": ErrorResponse},
    },
)
def get_admin_room(
    _actor: Annotated[AuthenticatedActor, Depends(require_staff)],
    repository: Annotated[RoomRepository, Depends(get_room_repository)],
    room_id: Annotated[str, Path(min_length=1, max_length=100)],
) -> DataResponse[RoomDetail]:
    room = repository.get_room(room_id)
    if room is None:
        raise ApiError(
            status_code=404,
            code="ROOM_NOT_FOUND",
            message="The requested room does not exist.",
        )

    images = repository.get_images(room_id)
    image_urls = repository.get_image_urls(
        [
            str(room.get("hinhanhchinh") or ""),
            *[str(image.get("hinhanh") or "") for image in images],
        ]
    )
    return DataResponse(
        data=map_room_detail(room, images, image_urls)
    )
