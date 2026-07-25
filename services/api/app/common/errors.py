from typing import Any

from fastapi import Request
from fastapi.responses import JSONResponse

from app.common.schemas import ErrorBody, ErrorResponse


class ApiError(Exception):
    def __init__(
        self,
        *,
        status_code: int,
        code: str,
        message: str,
        details: list[Any] | None = None,
    ) -> None:
        super().__init__(message)
        self.status_code = status_code
        self.code = code
        self.message = message
        self.details = details or []


async def api_error_handler(
    _request: Request,
    error: ApiError,
) -> JSONResponse:
    body = ErrorResponse(
        error=ErrorBody(
            code=error.code,
            message=error.message,
            details=error.details,
        )
    )
    return JSONResponse(
        status_code=error.status_code,
        content=body.model_dump(mode="json"),
    )
