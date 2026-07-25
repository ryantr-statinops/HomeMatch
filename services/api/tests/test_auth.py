import asyncio
from uuid import UUID

from httpx import ASGITransport, AsyncClient
import pytest

from app.common.errors import ApiError
from app.main import create_app
from app.modules.auth.dependencies import (
    ensure_role,
    get_auth_service,
)
from app.modules.auth.schemas import AdminRole, AuthenticatedActor
from app.modules.auth.service import (
    AuthFailureReason,
    AuthenticationFailed,
)

ADMIN_ID = UUID("00000000-0000-0000-0000-000000000001")


class FakeAuthService:
    def authenticate(self, access_token: str) -> AuthenticatedActor:
        if access_token == "admin-token":
            return AuthenticatedActor(
                user_id=ADMIN_ID,
                role=AdminRole.ADMIN,
                display_name="Staging Admin",
            )
        if access_token == "no-profile-token":
            raise AuthenticationFailed(
                AuthFailureReason.PROFILE_NOT_FOUND
            )
        raise AuthenticationFailed(AuthFailureReason.INVALID_TOKEN)


async def request_session(token: str | None = None):
    application = create_app()
    application.dependency_overrides[get_auth_service] = FakeAuthService
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    transport = ASGITransport(app=application)
    async with AsyncClient(
        transport=transport,
        base_url="http://test",
    ) as client:
        return await client.get("/api/v1/admin/session", headers=headers)


def test_session_requires_bearer_token() -> None:
    response = asyncio.run(request_session())

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "UNAUTHENTICATED"


def test_session_rejects_invalid_token() -> None:
    response = asyncio.run(request_session("invalid-token"))

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "UNAUTHENTICATED"


def test_session_rejects_user_without_profile() -> None:
    response = asyncio.run(request_session("no-profile-token"))

    assert response.status_code == 403
    assert response.json()["error"]["code"] == "FORBIDDEN"


def test_session_returns_authenticated_actor() -> None:
    response = asyncio.run(request_session("admin-token"))

    assert response.status_code == 200
    assert response.json() == {
        "data": {
            "user_id": str(ADMIN_ID),
            "role": "ADMIN",
            "display_name": "Staging Admin",
        },
        "meta": {},
    }


def test_admin_role_rejects_sale() -> None:
    actor = AuthenticatedActor(
        user_id=ADMIN_ID,
        role=AdminRole.SALE,
        display_name="Staging Sale",
    )

    with pytest.raises(ApiError) as error:
        ensure_role(actor, AdminRole.ADMIN)

    assert error.value.status_code == 403
    assert error.value.code == "FORBIDDEN"
