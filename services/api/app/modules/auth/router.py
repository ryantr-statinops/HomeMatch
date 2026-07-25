from typing import Annotated

from fastapi import APIRouter, Depends

from app.common.schemas import DataResponse, ErrorResponse
from app.modules.auth.dependencies import require_staff
from app.modules.auth.schemas import AuthenticatedActor, SessionData

router = APIRouter(prefix="/admin", tags=["admin-auth"])


@router.get(
    "/session",
    response_model=DataResponse[SessionData],
    responses={
        401: {"model": ErrorResponse},
        403: {"model": ErrorResponse},
    },
)
def get_admin_session(
    actor: Annotated[AuthenticatedActor, Depends(require_staff)],
) -> DataResponse[SessionData]:
    return DataResponse(
        data=SessionData(
            user_id=actor.user_id,
            role=actor.role,
            display_name=actor.display_name,
        )
    )
