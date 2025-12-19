from enum import Enum
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class EventType(str, Enum):
    """Types events, which use backend"""

    LESSON_UPDATED = "lesson.updated"


class BaseEvent(BaseModel):
    """Base class for all events from backend"""

    event_type: EventType
    producer: str = "backend"
    version: str = "1.0.0"
    correlation_id: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)

    model_config = ConfigDict(use_enum_values=True)
