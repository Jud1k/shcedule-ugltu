from app.core.events.base import BaseEvent, EventType
from app.domain.lesson.schemas import LessonRead


class LessonUpdatedEvent(BaseEvent):
    event_type: EventType = EventType.LESSON_UPDATED
    lesson_id: int
    teacher_id: int
    group_id: int
    old_lesson: LessonRead
    new_lesson: LessonRead
