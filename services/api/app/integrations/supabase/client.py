from supabase import Client, ClientOptions, create_client

from app.config.settings import Settings


class SupabaseConfigurationError(RuntimeError):
    """Raised when a server-side Supabase client cannot be configured."""


def create_supabase_client(
    settings: Settings,
    *,
    privileged: bool = False,
) -> Client:
    if not settings.supabase_url:
        raise SupabaseConfigurationError("SUPABASE_URL is required")

    secret = (
        settings.supabase_service_role_key
        if privileged
        else settings.supabase_anon_key
    )
    variable_name = (
        "SUPABASE_SERVICE_ROLE_KEY" if privileged else "SUPABASE_ANON_KEY"
    )
    if secret is None or not secret.get_secret_value():
        raise SupabaseConfigurationError(f"{variable_name} is required")

    return create_client(
        settings.supabase_url,
        secret.get_secret_value(),
        options=ClientOptions(
            auto_refresh_token=False,
            persist_session=False,
        ),
    )
