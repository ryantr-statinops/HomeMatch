from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

from app.common.schemas import DataResponse

router = APIRouter(tags=["health"])


class HealthData(BaseModel):
    status: Literal["ok"]
    service: str
    version: str


@router.get("/health", response_model=DataResponse[HealthData])
def get_health() -> DataResponse[HealthData]:
    return DataResponse(
        data=HealthData(
            status="ok",
            service="homematch-api",
            version="0.1.0",
        )
    )
