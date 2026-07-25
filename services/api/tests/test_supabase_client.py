from pydantic import SecretStr
import pytest

from app.config.settings import Settings
from app.integrations.supabase.client import (
    SupabaseConfigurationError,
    create_supabase_client,
)


def test_client_requires_supabase_url() -> None:
    settings = Settings(
        _env_file=None,
        supabase_anon_key=SecretStr("anon-key"),
    )

    with pytest.raises(SupabaseConfigurationError, match="SUPABASE_URL"):
        create_supabase_client(settings)


def test_privileged_client_requires_service_role_key() -> None:
    settings = Settings(
        _env_file=None,
        supabase_url="https://example.supabase.co",
        supabase_anon_key=SecretStr("anon-key"),
    )

    with pytest.raises(
        SupabaseConfigurationError,
        match="SUPABASE_SERVICE_ROLE_KEY",
    ):
        create_supabase_client(settings, privileged=True)


def test_client_uses_requested_access_key(monkeypatch: pytest.MonkeyPatch) -> None:
    captured: dict[str, str] = {}

    def fake_create_client(
        url: str,
        key: str,
        *,
        options: object,
    ) -> object:
        captured.update(url=url, key=key)
        return object()

    monkeypatch.setattr(
        "app.integrations.supabase.client.create_client",
        fake_create_client,
    )
    settings = Settings(
        _env_file=None,
        supabase_url="https://example.supabase.co",
        supabase_anon_key=SecretStr("anon-key"),
        supabase_service_role_key=SecretStr("service-key"),
    )

    create_supabase_client(settings, privileged=True)

    assert captured == {
        "url": "https://example.supabase.co",
        "key": "service-key",
    }
