import json
from pathlib import Path
import pytest
from fastapi.testclient import TestClient
from app.main import FIXTURE_ROOT, create_app

@pytest.fixture
def client():
    return TestClient(create_app())

def test_health(client):
    assert client.get("/api/v1/health").json() == {"data": {"status": "ok", "service": "research-terminal-api", "mode": "fixture"}, "meta": {"is_synthetic": True}}

@pytest.mark.parametrize("name", ["news", "market"])
def test_authoritative_fixture(client, name):
    response = client.get(f"/api/v1/demo/{name}")
    assert response.status_code == 200
    assert response.json()["data"] == json.loads((FIXTURE_ROOT / f"{name}.json").read_text(encoding="utf-8"))
    assert response.json()["meta"] == {"is_synthetic": True}

@pytest.mark.parametrize("content", [None, "{", '{"is_synthetic": false}', '{"is_synthetic": true}'])
def test_missing_or_invalid_fixture(tmp_path, content):
    if content is not None:
        (tmp_path / "news.json").write_text(content, encoding="utf-8")
    response = TestClient(create_app(tmp_path)).get("/api/v1/demo/news")
    assert response.status_code == 503
    assert response.json()["error"]["code"] == "fixture_unavailable"
    assert str(tmp_path) not in response.text

def test_non_synthetic_valid_shape_rejected(tmp_path):
    fixture = json.loads((FIXTURE_ROOT / "market.json").read_text(encoding="utf-8"))
    fixture["is_synthetic"] = False
    (tmp_path / "market.json").write_text(json.dumps(fixture), encoding="utf-8")
    assert TestClient(create_app(tmp_path)).get("/api/v1/demo/market").status_code == 503

@pytest.mark.parametrize("path", ["/api/v1/admin/rooms", "/api/v1/auth/me", "/api/v1/rooms"])
def test_legacy_routes_removed(client, path):
    response = client.get(path)
    assert response.status_code == 404
    assert "error" in response.json()

def test_read_only_and_no_cookie_cors(client):
    assert client.post("/api/v1/demo/news", json={}).status_code == 405
    response = client.get("/api/v1/demo/news", headers={"Origin": "https://untrusted.example"})
    assert "access-control-allow-origin" not in response.headers


def test_unexpected_failure_is_sanitized():
    app = create_app()
    @app.get("/failure")
    def failure():
        raise RuntimeError("private debugging details")
    response = TestClient(app, raise_server_exceptions=False).get("/failure")
    assert response.status_code == 500
    assert response.json()["error"]["code"] == "internal_error"
    assert "private debugging details" not in response.text
