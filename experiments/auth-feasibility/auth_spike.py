"""Small provider-independent JWT and ownership contract for feasibility only."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Mapping

import jwt
from jwt import InvalidTokenError


class AuthenticationError(Exception):
    """Token is absent, malformed, untrusted, or does not satisfy the contract."""


@dataclass(frozen=True)
class TrustedIssuer:
    issuer: str
    audience: str
    algorithm: str = "RS256"


class JwksKeySet:
    """In-memory key set; caller owns trusted retrieval and rotation policy."""

    def __init__(self, keys: Mapping[str, str]) -> None:
        self.replace(keys)

    def replace(self, keys: Mapping[str, str]) -> None:
        self._keys = dict(keys)

    def get(self, kid: str) -> str:
        try:
            return self._keys[kid]
        except KeyError as exc:
            raise AuthenticationError("unknown signing key") from exc


class TokenVerifier:
    def __init__(self, trusted: TrustedIssuer, keys: JwksKeySet) -> None:
        self._trusted = trusted
        self._keys = keys

    def verify(self, token: str) -> dict[str, Any]:
        try:
            header = jwt.get_unverified_header(token)
            if header.get("alg") != self._trusted.algorithm:
                raise AuthenticationError("disallowed signing algorithm")
            kid = header.get("kid")
            if not isinstance(kid, str) or not kid:
                raise AuthenticationError("missing signing key id")
            claims = jwt.decode(
                token,
                self._keys.get(kid),
                algorithms=[self._trusted.algorithm],
                issuer=self._trusted.issuer,
                audience=self._trusted.audience,
                options={"require": ["iss", "sub", "aud", "exp", "iat", "nbf"]},
            )
            if not isinstance(claims.get("sub"), str) or not claims["sub"]:
                raise AuthenticationError("missing subject")
            return claims
        except AuthenticationError:
            raise
        except (InvalidTokenError, TypeError, ValueError) as exc:
            raise AuthenticationError("invalid token") from exc


class AccountRegistry:
    """Illustrates stable local account IDs keyed by verified issuer and subject."""

    def __init__(self) -> None:
        self._accounts: dict[tuple[str, str], str] = {}

    def resolve(self, verified_claims: Mapping[str, Any]) -> str:
        issuer = verified_claims["iss"]
        subject = verified_claims["sub"]
        if not isinstance(issuer, str) or not isinstance(subject, str):
            raise ValueError("verified issuer and subject must be strings")
        key = (issuer, subject)
        if key not in self._accounts:
            # Deterministic for a testable demo; production should use a DB-generated UUID.
            self._accounts[key] = f"account-{len(self._accounts) + 1}"
        return self._accounts[key]


@dataclass(frozen=True)
class PrivateResource:
    resource_id: str
    account_id: str


def read_owned_resource(
    resource_id: str, account_id: str, resources: Mapping[str, PrivateResource]
) -> PrivateResource | None:
    """Model the server query predicate: resource ID AND verified account ID."""
    resource = resources.get(resource_id)
    if resource is None or resource.account_id != account_id:
        return None
    return resource


def read_owned_resource_for_token(
    token: str,
    verifier: TokenVerifier,
    accounts: AccountRegistry,
    resource_id: str,
    resources: Mapping[str, PrivateResource],
) -> PrivateResource | None:
    """Derive ownership only from a verified token, never from request fields."""
    claims = verifier.verify(token)
    account_id = accounts.resolve(claims)
    return read_owned_resource(resource_id, account_id, resources)
