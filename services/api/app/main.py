from fastapi import FastAPI

from app.modules.health.router import router as health_router


def create_app() -> FastAPI:
    application = FastAPI(
        title="HomeMatch API",
        version="0.1.0",
        docs_url="/docs",
        openapi_url="/openapi.json",
    )
    application.include_router(health_router, prefix="/api/v1")
    return application


app = create_app()
