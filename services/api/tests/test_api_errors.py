import asyncio

from fastapi import APIRouter
from httpx import ASGITransport, AsyncClient

from app.common.errors import ApiError
from app.main import create_app


async def request_error():
    application = create_app()
    router = APIRouter()

    @router.get("/error")
    def get_error() -> None:
        raise ApiError(
            status_code=403,
            code="FORBIDDEN",
            message="Permission denied",
        )

    application.include_router(router)
    transport = ASGITransport(app=application)
    async with AsyncClient(
        transport=transport,
        base_url="http://test",
    ) as client:
        return await client.get("/error")


def test_api_error_uses_standard_envelope() -> None:
    response = asyncio.run(request_error())

    assert response.status_code == 403
    assert response.json() == {
        "error": {
            "code": "FORBIDDEN",
            "message": "Permission denied",
            "details": [],
        }
    }
