from enum import StrEnum
from typing import Protocol
from uuid import UUID

from supabase import Client

from app.modules.auth.schemas import AdminRole, AuthenticatedActor


class AuthFailureReason(StrEnum):
    INVALID_TOKEN = "INVALID_TOKEN"
    PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND"
    PROFILE_INACTIVE = "PROFILE_INACTIVE"
    INVALID_ROLE = "INVALID_ROLE"


class AuthenticationFailed(RuntimeError):
    def __init__(self, reason: AuthFailureReason) -> None:
        super().__init__(reason.value)
        self.reason = reason


class AuthService(Protocol):
    def authenticate(self, access_token: str) -> AuthenticatedActor: ...


class SupabaseAuthService:
    def __init__(
        self,
        *,
        auth_client: Client,
        privileged_client: Client,
    ) -> None:
        self._auth_client = auth_client
        self._privileged_client = privileged_client

    def authenticate(self, access_token: str) -> AuthenticatedActor:
        try:
            response = self._auth_client.auth.get_user(access_token)
            user = response.user
        except Exception as error:
            raise AuthenticationFailed(
                AuthFailureReason.INVALID_TOKEN
            ) from error

        if user is None:
            raise AuthenticationFailed(AuthFailureReason.INVALID_TOKEN)

        try:
            profile_response = (
                self._privileged_client.table("admin_profile")
                .select("user_id, role, display_name, active")
                .eq("user_id", str(user.id))
                .maybe_single()
                .execute()
            )
            profile = profile_response.data
        except Exception as error:
            raise AuthenticationFailed(
                AuthFailureReason.PROFILE_NOT_FOUND
            ) from error

        if not profile:
            raise AuthenticationFailed(AuthFailureReason.PROFILE_NOT_FOUND)
        if not profile.get("active"):
            raise AuthenticationFailed(AuthFailureReason.PROFILE_INACTIVE)

        try:
            role = AdminRole(profile["role"])
        except (KeyError, ValueError) as error:
            raise AuthenticationFailed(
                AuthFailureReason.INVALID_ROLE
            ) from error

        return AuthenticatedActor(
            user_id=UUID(str(user.id)),
            role=role,
            display_name=str(profile.get("display_name") or ""),
        )
