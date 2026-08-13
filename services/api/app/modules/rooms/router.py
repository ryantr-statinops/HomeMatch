from math import ceil
from typing import Annotated, Any
from uuid import uuid4

from fastapi import APIRouter, Depends, Header, Path, Query, Request

from app.common.errors import ApiError
from app.common.schemas import DataResponse, ErrorResponse
from app.config.settings import Settings, get_settings
from app.integrations.supabase.client import create_supabase_client
from app.modules.auth.dependencies import require_admin, require_mutations_enabled, require_staff
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
    RoomMutationInput,
    RoomMutationResponse,
    RoomPatchInput,
)

router = APIRouter(prefix="/admin/rooms", tags=["admin-rooms"])


def _mutation_values(payload: RoomMutationInput | RoomPatchInput) -> dict[str, Any]:
    values = payload.model_dump(exclude_unset=isinstance(payload, RoomPatchInput))
    address = values.pop("address", None)
    costs = values.pop("costs", None)
    amenities = values.pop("amenities", None)
    field_map = {
        "code": "maphong",
        "room_type": "loaiphong",
        "contract_type": "hopdong",
        "floor": "lau",
        "price": "gia",
        "area": "dientich",
        "hours": "giogiac",
        "description": "tienich",
        "slug": "slug",
        "commission": "hoahong",
        "internal_notes": "ghichu",
        "owner_reference": "idchunha",
    }
    result = {field_map[key]: value for key, value in values.items()}
    if address is not None:
        result.update({
            "sonha": address["house_number"],
            "duong": address["street"],
            "phuong": address["ward"],
            "khuvuc": address["area"],
        })
    if costs is not None:
        result.update({
            "dien": costs["electricity"],
            "nuoc": costs["water"],
            "phiquanly": costs["management"],
            "phigiuxe": costs["parking"],
        })
    if amenities is not None:
        result.update({
            "maylanh": amenities["air_conditioner"],
            "kebep": amenities["kitchen_shelf"],
            "gac": amenities["loft"],
            "tulanh": amenities["refrigerator"],
            "nhavs": amenities["private_bathroom"],
            "cuaso": amenities["window"],
            "bancong": amenities["balcony"],
            "dexe": amenities["parking"],
            "thucung": amenities["pets_allowed"],
            "xedien": amenities["ev_support"],
            "maygiat": amenities["washing_machine"],
            "thangmay": amenities["elevator"],
        })
    return result


def _request_id(request: Request, supplied: str | None) -> str:
    return supplied or request.headers.get("x-request-id") or str(uuid4())


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


@router.post(
    "",
    response_model=DataResponse[RoomMutationResponse],
    dependencies=[Depends(require_mutations_enabled)],
    responses={400: {"model": ErrorResponse}, 401: {"model": ErrorResponse}, 403: {"model": ErrorResponse}, 503: {"model": ErrorResponse}},
)
def create_admin_room(
    payload: RoomMutationInput,
    request: Request,
    actor: Annotated[AuthenticatedActor, Depends(require_staff)],
    repository: Annotated[RoomRepository, Depends(get_room_repository)],
    request_id: Annotated[str | None, Header()] = None,
) -> DataResponse[RoomMutationResponse]:
    values = _mutation_values(payload)
    values.update({"idphong": uuid4().hex, "trangthai": "Ẩn"})
    created = repository.create_room(values)
    audit_id = _request_id(request, request_id)
    repository.write_audit(
        actor_id=str(actor.user_id), actor_role=actor.role.value,
        request_id=audit_id, action="CREATE", entity_id=str(created["idphong"]),
        before_data=None, after_data=created,
    )
    return DataResponse(data=RoomMutationResponse(id=str(created["idphong"]), row_version=int(created.get("row_version") or 1)))


@router.patch(
    "/{room_id}",
    response_model=DataResponse[RoomMutationResponse],
    dependencies=[Depends(require_mutations_enabled)],
    responses={401: {"model": ErrorResponse}, 403: {"model": ErrorResponse}, 404: {"model": ErrorResponse}, 409: {"model": ErrorResponse}, 503: {"model": ErrorResponse}},
)
def update_admin_room(
    payload: RoomPatchInput,
    request: Request,
    actor: Annotated[AuthenticatedActor, Depends(require_staff)],
    repository: Annotated[RoomRepository, Depends(get_room_repository)],
    room_id: Annotated[str, Path(min_length=1, max_length=100)],
    row_version: Annotated[int, Header(ge=1)],
    request_id: Annotated[str | None, Header()] = None,
) -> DataResponse[RoomMutationResponse]:
    before = repository.get_room(room_id)
    if before is None:
        raise ApiError(status_code=404, code="ROOM_NOT_FOUND", message="The requested room does not exist.")
    values = _mutation_values(payload)
    updated = repository.update_room(room_id, row_version, values)
    if updated is None:
        raise ApiError(status_code=409, code="ROOM_VERSION_CONFLICT", message="Room changed since it was loaded.")
    repository.write_audit(
        actor_id=str(actor.user_id), actor_role=actor.role.value,
        request_id=_request_id(request, request_id), action="UPDATE", entity_id=room_id,
        before_data=before, after_data=updated,
    )
    return DataResponse(data=RoomMutationResponse(id=room_id, row_version=int(updated.get("row_version") or row_version + 1)))


@router.post(
    "/{room_id}/archive",
    response_model=DataResponse[RoomMutationResponse],
    dependencies=[Depends(require_mutations_enabled)],
    responses={401: {"model": ErrorResponse}, 403: {"model": ErrorResponse}, 404: {"model": ErrorResponse}, 409: {"model": ErrorResponse}, 503: {"model": ErrorResponse}},
)
def archive_admin_room(
    request: Request,
    actor: Annotated[AuthenticatedActor, Depends(require_admin)],
    repository: Annotated[RoomRepository, Depends(get_room_repository)],
    room_id: Annotated[str, Path(min_length=1, max_length=100)],
    row_version: Annotated[int, Header(ge=1)],
    request_id: Annotated[str | None, Header()] = None,
) -> DataResponse[RoomMutationResponse]:
    before = repository.get_room(room_id)
    if before is None:
        raise ApiError(status_code=404, code="ROOM_NOT_FOUND", message="The requested room does not exist.")
    archived = repository.archive_room(room_id, row_version)
    if archived is None:
        raise ApiError(status_code=409, code="ROOM_VERSION_CONFLICT", message="Room changed since it was loaded.")
    repository.write_audit(
        actor_id=str(actor.user_id), actor_role=actor.role.value,
        request_id=_request_id(request, request_id), action="ARCHIVE", entity_id=room_id,
        before_data=before, after_data=archived,
    )
    return DataResponse(data=RoomMutationResponse(id=room_id, row_version=int(archived.get("row_version") or row_version + 1)))
