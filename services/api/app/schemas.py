from datetime import datetime
from typing import Literal
from pydantic import BaseModel, ConfigDict

class FixtureModel(BaseModel):
    model_config = ConfigDict(extra="forbid")

class FixtureHeader(FixtureModel):
    schema_version: Literal["1"]
    is_synthetic: Literal[True]
    source_id: Literal["fixture-only"]

class Instrument(FixtureModel):
    instrument_id: str
    display_symbol: str
    base_asset: str
    quote_asset: str

class Candle(FixtureModel):
    instrument_id: str
    interval: Literal["15m", "1h", "1d"]
    open_time: datetime
    close_time: datetime
    is_closed: Literal[True]
    open: str
    high: str
    low: str
    close: str
    volume: str

class MarketFixture(FixtureHeader):
    instruments: list[Instrument]
    candles: list[Candle]

class Article(FixtureModel):
    id: str
    title: str
    instrument_ids: list[str]
    published_at: datetime
    first_seen_at: datetime
    language: str
    url: str | None

class NewsFixture(FixtureHeader):
    articles: list[Article]

class Meta(FixtureModel):
    is_synthetic: Literal[True] = True

class Health(FixtureModel):
    status: Literal["ok"] = "ok"
    service: Literal["research-terminal-api"] = "research-terminal-api"
    mode: Literal["fixture"] = "fixture"

class HealthResponse(FixtureModel):
    data: Health
    meta: Meta

class MarketResponse(FixtureModel):
    data: MarketFixture
    meta: Meta

class NewsResponse(FixtureModel):
    data: NewsFixture
    meta: Meta

class ErrorDetail(FixtureModel):
    code: str
    message: str

class ErrorResponse(FixtureModel):
    error: ErrorDetail
    meta: Meta
