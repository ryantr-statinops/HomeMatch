from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import get_settings
from app.modules.health.router import router as health_router


def create_app() -> FastAPI:
    settings = get_settings()
    application = FastAPI(
        title="HomeMatch API",
        version="0.1.0",
        docs_url="/docs",
        openapi_url="/openapi.json",
    )
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_origin_regex=settings.allowed_origin_regex,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(health_router, prefix="/api/v1")
    return application


app = create_app()
