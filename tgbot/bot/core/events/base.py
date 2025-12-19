from enum import Enum
from typing import Any
from pydantic import BaseModel, Field, ConfigDict


class IncomingEventType(str, Enum):
    """Types events, which used to get backend events"""

    LESSON_UPDATED = "lesson.updated"


class BaseIncomingEvent(BaseModel):
    """Base class for all incoming events"""

    event_type: IncomingEventType
    producer: str
    version: str
    correlation_id: str | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)

    model_config = ConfigDict(use_enum_values=True)
