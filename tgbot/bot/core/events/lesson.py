from bot.services.schemas import Lesson
from bot.core.events.base import BaseIncomingEvent, IncomingEventType


class LessonUpdatedEvent(BaseIncomingEvent):
    event_type: IncomingEventType = IncomingEventType.LESSON_UPDATED
    lesson_id: int
    teacher_id: int
    group_id: int
    old_lesson: Lesson
    new_lesson: Lesson
