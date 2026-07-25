from collections.abc import Callable
from typing import Annotated

from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.common.errors import ApiError
from app.config.settings import Settings, get_settings
from app.integrations.supabase.client import create_supabase_client
from app.modules.auth.schemas import AdminRole, AuthenticatedActor
from app.modules.auth.service import (
    AuthFailureReason,
    AuthenticationFailed,
    AuthService,
    SupabaseAuthService,
)

bearer_scheme = HTTPBearer(auto_error=False)


def get_auth_service(
    settings: Annotated[Settings, Depends(get_settings)],
) -> AuthService:
    return SupabaseAuthService(
        auth_client=create_supabase_client(settings),
        privileged_client=create_supabase_client(
            settings,
            privileged=True,
        ),
    )


def get_current_actor(
    credentials: Annotated[
        HTTPAuthorizationCredentials | None,
        Depends(bearer_scheme),
    ],
    auth_service: Annotated[AuthService, Depends(get_auth_service)],
) -> AuthenticatedActor:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise ApiError(
            status_code=401,
            code="UNAUTHENTICATED",
            message="A valid access token is required.",
        )

    try:
        return auth_service.authenticate(credentials.credentials)
    except AuthenticationFailed as error:
        if error.reason is AuthFailureReason.INVALID_TOKEN:
            raise ApiError(
                status_code=401,
                code="UNAUTHENTICATED",
                message="The access token is invalid or expired.",
            ) from error
        raise ApiError(
            status_code=403,
            code="FORBIDDEN",
            message="The account is not authorized for Admin Portal.",
        ) from error


def ensure_role(
    actor: AuthenticatedActor,
    *allowed_roles: AdminRole,
) -> AuthenticatedActor:
    if actor.role not in allowed_roles:
        raise ApiError(
            status_code=403,
            code="FORBIDDEN",
            message="The account does not have permission for this action.",
        )
    return actor


def require_roles(
    *allowed_roles: AdminRole,
) -> Callable[..., AuthenticatedActor]:
    def dependency(
        actor: Annotated[
            AuthenticatedActor,
            Depends(get_current_actor),
        ],
    ) -> AuthenticatedActor:
        return ensure_role(actor, *allowed_roles)

    return dependency


require_staff = require_roles(AdminRole.ADMIN, AdminRole.SALE)
require_admin = require_roles(AdminRole.ADMIN)
