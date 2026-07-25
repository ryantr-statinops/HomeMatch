from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel


class AdminRole(StrEnum):
    ADMIN = "ADMIN"
    SALE = "SALE"


class AuthenticatedActor(BaseModel):
    user_id: UUID
    role: AdminRole
    display_name: str


class SessionData(BaseModel):
    user_id: UUID
    role: AdminRole
    display_name: str
