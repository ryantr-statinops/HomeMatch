from dataclasses import dataclass
from typing import Any, Protocol

from supabase import Client


ROOM_COLUMNS = (
    "idphong,maphong,hinhanhchinh,loaiphong,sonha,duong,phuong,"
    "khuvuc,hopdong,gia,dientich,maylanh,kebep,gac,tulanh,nhavs,"
    "cuaso,bancong,dexe,thucung,xedien,giogiac,maygiat,thangmay,"
    "lau,dien,nuoc,phiquanly,phigiuxe,tienich,trangthai,hoahong,"
    "ghichu,idchunha,slug,ngaytao,ngaycapnhat,archived_at,row_version"
)


@dataclass(frozen=True)
class RoomPage:
    rows: list[dict[str, Any]]
    total: int


class RoomRepository(Protocol):
    def list_rooms(
        self,
        *,
        search: str | None,
        status: str | None,
        archived: bool | None,
        area: str | None,
        offset: int,
        limit: int,
    ) -> RoomPage: ...

    def get_room(self, room_id: str) -> dict[str, Any] | None: ...

    def get_images(self, room_id: str) -> list[dict[str, Any]]: ...

    def get_image_urls(self, paths: list[str]) -> dict[str, str]: ...


class SupabaseRoomRepository:
    def __init__(self, client: Client) -> None:
        self._client = client

    def list_rooms(
        self,
        *,
        search: str | None,
        status: str | None,
        archived: bool | None,
        area: str | None,
        offset: int,
        limit: int,
    ) -> RoomPage:
        query = self._client.table("phongtro").select(
            ROOM_COLUMNS,
            count="exact",
        )
        if search:
            safe_search = search.replace(",", " ").strip()
            query = query.or_(
                f"maphong.ilike.%{safe_search}%,"
                f"duong.ilike.%{safe_search}%,"
                f"khuvuc.ilike.%{safe_search}%"
            )
        if status:
            query = query.eq("trangthai", status)
        if archived is True:
            query = query.not_.is_("archived_at", "null")
        elif archived is False:
            query = query.is_("archived_at", "null")
        if area:
            query = query.eq("khuvuc", area)

        response = (
            query.order("idphong", desc=True)
            .range(offset, offset + limit - 1)
            .execute()
        )
        return RoomPage(
            rows=list(response.data or []),
            total=int(response.count or 0),
        )

    def get_room(self, room_id: str) -> dict[str, Any] | None:
        response = (
            self._client.table("phongtro")
            .select(ROOM_COLUMNS)
            .eq("idphong", room_id)
            .maybe_single()
            .execute()
        )
        return response.data

    def get_images(self, room_id: str) -> list[dict[str, Any]]:
        response = (
            self._client.table("hinhanh")
            .select("idanh,idphong,hinhanh,sortorder,createdat")
            .eq("idphong", room_id)
            .order("sortorder")
            .execute()
        )
        return list(response.data or [])

    def get_image_urls(self, paths: list[str]) -> dict[str, str]:
        unique_paths = sorted(set(filter(None, paths)))
        if not unique_paths:
            return {}
        response = (
            self._client.table("imagecache")
            .select("path,drive_url")
            .in_("path", unique_paths)
            .execute()
        )
        return {
            str(row["path"]): str(row["drive_url"])
            for row in response.data or []
        }
