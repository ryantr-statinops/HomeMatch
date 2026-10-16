from __future__ import annotations

import time

import jwt
import pytest
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

from auth_spike import (
    AccountRegistry,
    AuthenticationError,
    JwksKeySet,
    PrivateResource,
    TokenVerifier,
    TrustedIssuer,
    read_owned_resource_for_token,
)


ISSUER = "https://auth.example.test/"
AUDIENCE = "research-terminal-api"


def key_pair() -> tuple[str, str]:
    private = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    private_pem = private.private_bytes(
        serialization.Encoding.PEM,
        serialization.PrivateFormat.PKCS8,
        serialization.NoEncryption(),
    ).decode()
    public_pem = private.public_key().public_bytes(
        serialization.Encoding.PEM,
        serialization.PublicFormat.SubjectPublicKeyInfo,
    ).decode()
    return private_pem, public_pem


def token(
    private_key: str,
    *,
    kid: str = "key-1",
    without: tuple[str, ...] = (),
    **overrides: object,
) -> str:
    now = int(time.time())
    claims: dict[str, object] = {
        "iss": ISSUER,
        "sub": "provider-user-a",
        "aud": AUDIENCE,
        "iat": now,
        "nbf": now - 1,
        "exp": now + 300,
    }
    claims.update(overrides)
    for claim in without:
        claims.pop(claim, None)
    return jwt.encode(claims, private_key, algorithm="RS256", headers={"kid": kid})


@pytest.fixture
def verifier_material():
    private_key, public_key = key_pair()
    keys = JwksKeySet({"key-1": public_key})
    verifier = TokenVerifier(TrustedIssuer(ISSUER, AUDIENCE), keys)
    return private_key, keys, verifier


def test_accepts_valid_token_and_returns_verified_claims(verifier_material):
    private_key, _, verifier = verifier_material
    claims = verifier.verify(token(private_key))
    assert claims["sub"] == "provider-user-a"
    assert claims["iss"] == ISSUER


@pytest.mark.parametrize(
    "claims",
    [
        {"iss": "https://attacker.example/"},
        {"aud": "some-other-api"},
        {"exp": int(time.time()) - 30},
        {"nbf": int(time.time()) + 600},
        {"iat": int(time.time()) + 600},
        {"sub": ""},
        {"sub": None},
    ],
    ids=["wrong-issuer", "wrong-audience", "expired", "not-yet-valid", "future-issued-at", "empty-sub", "null-sub"],
)
def test_rejects_invalid_required_claims(verifier_material, claims):
    private_key, _, verifier = verifier_material
    with pytest.raises(AuthenticationError):
        verifier.verify(token(private_key, **claims))


@pytest.mark.parametrize("claim", ["iss", "sub", "aud", "exp", "iat", "nbf"])
def test_rejects_missing_required_claim(verifier_material, claim):
    private_key, _, verifier = verifier_material
    with pytest.raises(AuthenticationError):
        verifier.verify(token(private_key, without=(claim,)))


def test_rejects_malformed_token(verifier_material):
    _, _, verifier = verifier_material
    with pytest.raises(AuthenticationError):
        verifier.verify("not.a.jwt")


def test_rejects_disallowed_algorithm_even_with_a_known_key(verifier_material):
    private_key, _, verifier = verifier_material
    claims = {"iss": ISSUER, "sub": "user", "aud": AUDIENCE,
              "iat": int(time.time()), "nbf": int(time.time()) - 1,
              "exp": int(time.time()) + 300}
    forged_header = jwt.encode(claims, private_key, algorithm="RS384", headers={"kid": "key-1"})
    with pytest.raises(AuthenticationError, match="disallowed"):
        verifier.verify(forged_header)


def test_rejects_unknown_kid(verifier_material):
    private_key, _, verifier = verifier_material
    with pytest.raises(AuthenticationError, match="unknown signing key"):
        verifier.verify(token(private_key, kid="untrusted-kid"))


def test_rejects_invalid_signature(verifier_material):
    private_key, _, verifier = verifier_material
    signed = token(private_key)
    parts = signed.split(".")
    parts[2] = ("A" if parts[2][0] != "A" else "B") + parts[2][1:]
    with pytest.raises(AuthenticationError):
        verifier.verify(".".join(parts))


def test_key_rotation_accepts_new_key_only_after_trusted_keyset_update(verifier_material):
    old_private, keys, verifier = verifier_material
    old_token = token(old_private, kid="key-1")
    rotated_private, rotated_public = key_pair()
    rotated = token(rotated_private, kid="key-2")
    with pytest.raises(AuthenticationError, match="unknown signing key"):
        verifier.verify(rotated)
    keys.replace({"key-2": rotated_public})
    assert verifier.verify(rotated)["sub"] == "provider-user-a"
    with pytest.raises(AuthenticationError, match="unknown signing key"):
        verifier.verify(old_token)


def test_same_issuer_subject_maps_to_same_account_and_different_issuer_does_not():
    registry = AccountRegistry()
    first = {"iss": ISSUER, "sub": "same-subject"}
    same = {"iss": ISSUER, "sub": "same-subject"}
    other_issuer = {"iss": "https://other.example/", "sub": "same-subject"}
    assert registry.resolve(first) == registry.resolve(same)
    assert registry.resolve(first) != registry.resolve(other_issuer)


def test_private_resource_is_hidden_from_another_account():
    private_key, public_key = key_pair()
    keys = JwksKeySet({"key-1": public_key})
    verifier = TokenVerifier(TrustedIssuer(ISSUER, AUDIENCE), keys)
    accounts = AccountRegistry()
    user_a = token(private_key, sub="provider-user-a")
    user_b = token(private_key, sub="provider-user-b")
    account_a = accounts.resolve(verifier.verify(user_a))
    resources = {"portfolio-1": PrivateResource("portfolio-1", account_a)}
    assert read_owned_resource_for_token(
        user_a, verifier, accounts, "portfolio-1", resources
    ) == resources["portfolio-1"]
    assert read_owned_resource_for_token(
        user_b, verifier, accounts, "portfolio-1", resources
    ) is None
    assert read_owned_resource_for_token(
        user_a, verifier, accounts, "guessed-id", resources
    ) is None
