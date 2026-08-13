import asyncio
from typing import Any
from uuid import UUID

from httpx import ASGITransport, AsyncClient

from app.main import create_app
from app.modules.auth.dependencies import get_auth_service
from app.config.settings import get_settings
from app.modules.auth.schemas import AdminRole, AuthenticatedActor
from app.modules.rooms.repository import RoomPage
from app.modules.rooms.router import get_room_repository

ADMIN_ID = UUID("00000000-0000-0000-0000-000000000001")

ROOM_ROW: dict[str, Any] = {
    "idphong": "2999000000001",
    "maphong": "STG-001",
    "loaiphong": "Studio",
    "sonha": "12",
    "duong": "Duong Staging",
    "phuong": "Phuong Test",
    "khuvuc": "Quan Test",
    "gia": "4500000",
    "dientich": "25 m2",
    "trangthai": "Trống",
    "hinhanhchinh": "images/main.webp",
    "row_version": 2,
    "ngaycapnhat": "2026-07-25T09:00:00+00:00",
}


class FakeAuthService:
    def authenticate(self, _access_token: str) -> AuthenticatedActor:
        return AuthenticatedActor(
            user_id=ADMIN_ID,
            role=AdminRole.ADMIN,
            display_name="Staging Admin",
        )


class FakeRoomRepository:
    def __init__(self) -> None:
        self.list_arguments: dict[str, Any] = {}

    def list_rooms(self, **arguments: Any) -> RoomPage:
        self.list_arguments = arguments
        return RoomPage(rows=[ROOM_ROW], total=13)

    def get_room(self, room_id: str) -> dict[str, Any] | None:
        return ROOM_ROW if room_id == ROOM_ROW["idphong"] else None

    def get_images(self, _room_id: str) -> list[dict[str, Any]]:
        return [
            {
                "idanh": "IMG-1",
                "hinhanh": "images/main.webp",
                "sortorder": 0,
                "createdat": "2026-07-25T09:00:00+00:00",
            }
        ]

    def get_image_urls(self, paths: list[str]) -> dict[str, str]:
        return {
            path: f"https://images.test/{path}"
            for path in paths
            if path
        }

    def create_room(self, values: dict[str, Any]) -> dict[str, Any]:
        return {**ROOM_ROW, **values, "row_version": 1}

    def update_room(self, room_id: str, expected_version: int, values: dict[str, Any]) -> dict[str, Any] | None:
        if room_id != ROOM_ROW["idphong"] or expected_version != 2:
            return None
        return {**ROOM_ROW, **values, "row_version": 3}

    def archive_room(self, room_id: str, expected_version: int) -> dict[str, Any] | None:
        if room_id != ROOM_ROW["idphong"] or expected_version != 2:
            return None
        return {**ROOM_ROW, "archived_at": "2026-08-13T00:00:00+00:00", "row_version": 3}

    def write_audit(self, **_arguments: Any) -> None:
        return None


async def request(
    path: str,
    *,
    token: str | None = "staff-token",
    repository: FakeRoomRepository | None = None,
    mutations_enabled: bool = False,
    method: str = "GET",
    json: dict[str, Any] | None = None,
    headers_extra: dict[str, str] | None = None,
):
    application = create_app()
    application.dependency_overrides[get_room_repository] = (
        lambda: repository or FakeRoomRepository()
    )
    application.dependency_overrides[get_auth_service] = FakeAuthService
    application.dependency_overrides[get_settings] = lambda: type(
        "TestSettings", (), {"admin_mutations_enabled": mutations_enabled}
    )()
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    headers.update(headers_extra or {})
    async with AsyncClient(
        transport=ASGITransport(app=application),
        base_url="http://test",
    ) as client:
        return await client.request(method, path, headers=headers, json=json)


def test_room_list_requires_authentication() -> None:
    response = asyncio.run(request("/api/v1/admin/rooms", token=None))

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "UNAUTHENTICATED"


def test_room_list_returns_normalized_page() -> None:
    repository = FakeRoomRepository()
    response = asyncio.run(
        request(
            "/api/v1/admin/rooms?page=2&page_size=12&status=ACTIVE",
            repository=repository,
        )
    )

    assert response.status_code == 200
    body = response.json()
    assert body["meta"] == {
        "page": 2,
        "page_size": 12,
        "total": 13,
        "total_pages": 2,
    }
    assert body["data"][0]["status"] == "ACTIVE"
    assert body["data"][0]["price"] == 4500000
    assert body["data"][0]["main_image_url"].endswith("images/main.webp")
    assert repository.list_arguments["offset"] == 12
    assert repository.list_arguments["status"] == "Trống"
    assert repository.list_arguments["archived"] is False


def test_room_detail_returns_gallery() -> None:
    response = asyncio.run(
        request("/api/v1/admin/rooms/2999000000001")
    )

    assert response.status_code == 200
    data = response.json()["data"]
    assert data["id"] == "2999000000001"
    assert data["row_version"] == 2
    assert data["images"][0]["resolved_url"].endswith("images/main.webp")


def test_room_detail_returns_not_found() -> None:
    response = asyncio.run(request("/api/v1/admin/rooms/missing"))

    assert response.status_code == 404
    assert response.json()["error"]["code"] == "ROOM_NOT_FOUND"


def test_archived_filter_uses_archive_column() -> None:
    repository = FakeRoomRepository()
    response = asyncio.run(
        request(
            "/api/v1/admin/rooms?status=ARCHIVED",
            repository=repository,
        )
    )

    assert response.status_code == 200
    assert repository.list_arguments["status"] is None
    assert repository.list_arguments["archived"] is True


def test_mutations_are_disabled_by_default() -> None:
    response = asyncio.run(
        request(
            "/api/v1/admin/rooms",
            method="POST",
            json={"code": "NEW-001"},
        )
    )

    assert response.status_code == 503
    assert response.json()["error"]["code"] == "MUTATIONS_DISABLED"


def test_staff_can_create_room_when_enabled() -> None:
    response = asyncio.run(
        request(
            "/api/v1/admin/rooms",
            method="POST",
            mutations_enabled=True,
            json={"code": "NEW-001", "price": 4000000},
        )
    )

    assert response.status_code == 200
    assert response.json()["data"]["row_version"] == 1


def test_update_requires_matching_row_version() -> None:
    response = asyncio.run(
        request(
            "/api/v1/admin/rooms/2999000000001",
            method="PATCH",
            mutations_enabled=True,
            headers_extra={"row-version": "1"},
            json={"code": "UPDATED"},
        )
    )

    assert response.status_code == 409
    assert response.json()["error"]["code"] == "ROOM_VERSION_CONFLICT"
