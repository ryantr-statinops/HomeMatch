from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field, field_validator


class RoomStatus(StrEnum):
    ACTIVE = "ACTIVE"
    RENTED = "RENTED"
    HIDDEN = "HIDDEN"
    ARCHIVED = "ARCHIVED"


class RoomAddress(BaseModel):
    house_number: str = ""
    street: str = ""
    ward: str = ""
    area: str = ""


class RoomCosts(BaseModel):
    electricity: str = ""
    water: str = ""
    management: str = ""
    parking: str = ""


class RoomAmenities(BaseModel):
    air_conditioner: str = ""
    kitchen_shelf: str = ""
    loft: str = ""
    refrigerator: str = ""
    private_bathroom: str = ""
    window: str = ""
    balcony: str = ""
    parking: str = ""
    pets_allowed: str = ""
    ev_support: str = ""
    washing_machine: str = ""
    elevator: str = ""


class RoomImage(BaseModel):
    id: str
    path: str
    resolved_url: str | None = None
    sort_order: int = 0
    created_at: datetime | None = None


class RoomSummary(BaseModel):
    id: str
    code: str = ""
    room_type: str = ""
    address: RoomAddress
    price: float | None = None
    area: float | None = None
    status: RoomStatus
    legacy_status: str = ""
    main_image_path: str | None = None
    main_image_url: str | None = None
    updated_at: datetime | None = None
    archived_at: datetime | None = None
    row_version: int = 1


class RoomDetail(RoomSummary):
    contract_type: str = ""
    floor: str = ""
    costs: RoomCosts
    amenities: RoomAmenities
    hours: str = ""
    description: str = ""
    slug: str = ""
    commission: str = ""
    internal_notes: str = ""
    owner_reference: str = ""
    created_at: datetime | None = None
    images: list[RoomImage] = Field(default_factory=list)


class RoomListMeta(BaseModel):
    page: int
    page_size: int
    total: int
    total_pages: int


class RoomMutationInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    code: str = ""
    room_type: str = ""
    address: RoomAddress = Field(default_factory=RoomAddress)
    price: float | None = Field(default=None, ge=0)
    area: float | None = Field(default=None, ge=0)
    contract_type: str = ""
    floor: str = ""
    costs: RoomCosts = Field(default_factory=RoomCosts)
    amenities: RoomAmenities = Field(default_factory=RoomAmenities)
    hours: str = ""
    description: str = ""
    slug: str = ""
    commission: str = ""
    internal_notes: str = ""
    owner_reference: str = ""

    @field_validator("code", "room_type", "contract_type", "floor", "hours", "slug", "commission", "internal_notes", "owner_reference")
    @classmethod
    def trim_text(cls, value: str) -> str:
        return value.strip()


class RoomPatchInput(RoomMutationInput):
    model_config = ConfigDict(extra="forbid")

    code: str | None = None
    room_type: str | None = None
    address: RoomAddress | None = None
    price: float | None = Field(default=None, ge=0)
    area: float | None = Field(default=None, ge=0)
    contract_type: str | None = None
    floor: str | None = None
    costs: RoomCosts | None = None
    amenities: RoomAmenities | None = None
    hours: str | None = None
    description: str | None = None
    slug: str | None = None
    commission: str | None = None
    internal_notes: str | None = None
    owner_reference: str | None = None


class RoomMutationResponse(BaseModel):
    id: str
    row_version: int
