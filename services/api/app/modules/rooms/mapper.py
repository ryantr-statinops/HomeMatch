import re
import unicodedata
from datetime import datetime
from typing import Any

from app.modules.rooms.schemas import (
    RoomAddress,
    RoomAmenities,
    RoomCosts,
    RoomDetail,
    RoomImage,
    RoomStatus,
    RoomSummary,
)


def _text(row: dict[str, Any], key: str) -> str:
    return str(row.get(key) or "").strip()


def _number(value: Any) -> float | None:
    if value is None:
        return None
    match = re.search(r"-?\d+(?:[.,]\d+)?", str(value).replace(" ", ""))
    if not match:
        return None
    return float(match.group(0).replace(",", "."))


def _datetime(value: Any) -> datetime | None:
    if not value:
        return None
    if isinstance(value, datetime):
        return value
    return datetime.fromisoformat(str(value).replace("Z", "+00:00"))


def map_status(value: Any, archived_at: Any = None) -> RoomStatus:
    if archived_at:
        return RoomStatus.ARCHIVED
    normalized = unicodedata.normalize("NFD", str(value or "").lower())
    normalized = "".join(
        character
        for character in normalized
        if unicodedata.category(character) != "Mn"
    )
    normalized = " ".join(normalized.split())
    if normalized == "trong":
        return RoomStatus.ACTIVE
    if normalized == "da thue":
        return RoomStatus.RENTED
    return RoomStatus.HIDDEN


def map_room_summary(
    row: dict[str, Any],
    image_urls: dict[str, str],
) -> RoomSummary:
    main_image_path = _text(row, "hinhanhchinh") or None
    return RoomSummary(
        id=_text(row, "idphong"),
        code=_text(row, "maphong"),
        room_type=_text(row, "loaiphong"),
        address=RoomAddress(
            house_number=_text(row, "sonha"),
            street=_text(row, "duong"),
            ward=_text(row, "phuong"),
            area=_text(row, "khuvuc"),
        ),
        price=_number(row.get("gia")),
        area=_number(row.get("dientich")),
        status=map_status(row.get("trangthai"), row.get("archived_at")),
        legacy_status=_text(row, "trangthai"),
        main_image_path=main_image_path,
        main_image_url=image_urls.get(main_image_path or ""),
        updated_at=_datetime(row.get("ngaycapnhat")),
        archived_at=_datetime(row.get("archived_at")),
        row_version=int(row.get("row_version") or 1),
    )


def map_room_detail(
    row: dict[str, Any],
    image_rows: list[dict[str, Any]],
    image_urls: dict[str, str],
) -> RoomDetail:
    summary = map_room_summary(row, image_urls)
    return RoomDetail(
        **summary.model_dump(),
        contract_type=_text(row, "hopdong"),
        floor=_text(row, "lau"),
        costs=RoomCosts(
            electricity=_text(row, "dien"),
            water=_text(row, "nuoc"),
            management=_text(row, "phiquanly"),
            parking=_text(row, "phigiuxe"),
        ),
        amenities=RoomAmenities(
            air_conditioner=_text(row, "maylanh"),
            kitchen_shelf=_text(row, "kebep"),
            loft=_text(row, "gac"),
            refrigerator=_text(row, "tulanh"),
            private_bathroom=_text(row, "nhavs"),
            window=_text(row, "cuaso"),
            balcony=_text(row, "bancong"),
            parking=_text(row, "dexe"),
            pets_allowed=_text(row, "thucung"),
            ev_support=_text(row, "xedien"),
            washing_machine=_text(row, "maygiat"),
            elevator=_text(row, "thangmay"),
        ),
        hours=_text(row, "giogiac"),
        description=_text(row, "tienich"),
        slug=_text(row, "slug"),
        commission=_text(row, "hoahong"),
        internal_notes=_text(row, "ghichu"),
        owner_reference=_text(row, "idchunha"),
        created_at=_datetime(row.get("ngaytao")),
        images=[
            RoomImage(
                id=_text(image, "idanh"),
                path=_text(image, "hinhanh"),
                resolved_url=image_urls.get(_text(image, "hinhanh")),
                sort_order=int(image.get("sortorder") or 0),
                created_at=_datetime(image.get("createdat")),
            )
            for image in image_rows
        ],
    )
