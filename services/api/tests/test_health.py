import asyncio

from httpx import ASGITransport, AsyncClient

from app.main import app


async def request_health():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        return await client.get("/api/v1/health")


def test_health_check() -> None:
    response = asyncio.run(request_health())

    assert response.status_code == 200
    assert response.json() == {
        "data": {
            "status": "ok",
            "service": "homematch-api",
            "version": "0.1.0",
        },
        "meta": {},
    }
