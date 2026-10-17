"""Read-only fixture API. No credentials or external clients."""
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from starlette.exceptions import HTTPException
from app.schemas import (ErrorResponse, Health, HealthResponse, MarketFixture,
                         MarketResponse, Meta, NewsFixture, NewsResponse)

FIXTURE_ROOT = Path(__file__).resolve().parents[3] / "data" / "fixtures"

class FixtureUnavailable(Exception):
    pass

def load_fixture(directory: Path, name: str, model):
    try:
        return model.model_validate_json((directory / name).read_text(encoding="utf-8"))
    except (OSError, ValidationError, ValueError) as exc:
        raise FixtureUnavailable() from exc

def error_response(status: int, code: str, message: str):
    return JSONResponse(status_code=status, content={
        "error": {"code": code, "message": message},
        "meta": {"is_synthetic": True},
    })

def create_app(fixture_root: Path | None = None) -> FastAPI:
    directory = fixture_root if fixture_root is not None else FIXTURE_ROOT
    application = FastAPI(title="Research Terminal Fixture API", version="0.1.0",
                          responses={404: {"model": ErrorResponse}, 422: {"model": ErrorResponse},
                                     500: {"model": ErrorResponse}, 503: {"model": ErrorResponse}})

    @application.exception_handler(Exception)
    async def unexpected_error(request: Request, exc: Exception):
        return error_response(500, "internal_error", "Unexpected server error.")

    @application.exception_handler(FixtureUnavailable)
    async def fixture_error(request: Request, exc: FixtureUnavailable):
        return error_response(503, "fixture_unavailable", "Synthetic fixture is missing or invalid.")

    @application.exception_handler(HTTPException)
    async def http_error(request: Request, exc: HTTPException):
        return error_response(exc.status_code, "http_error", str(exc.detail))

    @application.exception_handler(RequestValidationError)
    async def validation_error(request: Request, exc: RequestValidationError):
        return error_response(422, "invalid_request", "Request validation failed.")

    @application.get("/api/v1/health", response_model=HealthResponse)
    def health():
        return HealthResponse(data=Health(), meta=Meta())

    @application.get("/api/v1/demo/news", response_model=NewsResponse)
    def news():
        return NewsResponse(data=load_fixture(directory, "news.json", NewsFixture), meta=Meta())

    @application.get("/api/v1/demo/market", response_model=MarketResponse)
    def market():
        return MarketResponse(data=load_fixture(directory, "market.json", MarketFixture), meta=Meta())

    return application

app = create_app()
