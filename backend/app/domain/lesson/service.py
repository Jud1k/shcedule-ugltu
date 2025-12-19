import logging

from app.core.events.lesson import LessonUpdatedEvent
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.exceptions import ConflictException, NotFoundException
from app.domain.lesson.repository import LessonRepository
from app.domain.lesson.schemas import LessonCreate, LessonRead, LessonUpdate
from app.db.models import Lesson
from app.core.broker.rabbit_connection import rabbit_conn

logger = logging.getLogger(__name__)


class LessonService:
    def __init__(self, session: AsyncSession):
        self.lesson_repo = LessonRepository(session)

    async def get_all(self) -> list[Lesson]:
        return await self.lesson_repo.get_lessons()

    async def get_by_id(self, lesson_id: int) -> Lesson | None:
        lesson = await self.lesson_repo.get_one_or_none_by_id(id=lesson_id)
        return lesson

    async def get_lessons_by_group_id(self, group_id: int) -> list[Lesson]:
        return await self.lesson_repo.get_lessons_by_group_id(group_id=group_id)

    async def get_lessons_by_room_id(self, room_id: int) -> list[Lesson]:
        return await self.lesson_repo.get_lessons_by_room_id(room_id=room_id)

    async def get_lessons_by_teacher_id(self, teacher_id: int) -> list[Lesson]:
        return await self.lesson_repo.get_lessons_by_teacher_id(teacher_id=teacher_id)

    async def create(self, lesson_in: LessonCreate) -> Lesson:
        try:
            lesson = await self.lesson_repo.create(data=lesson_in)
            return lesson
        except IntegrityError as e:
            logger.error(f"Integirity error while creating Lesson:{str(e)} ")
            raise ConflictException("Lesson")

    async def update(self, lesson_id: int, lesson_in: LessonUpdate) -> Lesson:
        lesson = await self.lesson_repo.get_lesson(lesson_id=lesson_id)
        if not lesson:
            raise NotFoundException("Lesson", lesson_id)
        try:
            old_lesson = LessonRead.model_validate(lesson, from_attributes=True)
            updated_lesson = await self.lesson_repo.update(data=lesson, update_data=lesson_in)
            new_lesson = await self.lesson_repo.get_lesson(updated_lesson.id)
            if not new_lesson:
                raise NotFoundException("Lesson", lesson_id)
            new_lesson = LessonRead.model_validate(new_lesson, from_attributes=True)

            event = LessonUpdatedEvent(
                lesson_id=lesson_id,
                group_id=lesson_in.group_id,
                teacher_id=lesson_in.teacher_id,
                old_lesson=old_lesson,
                new_leson=new_lesson,
            )
            event_dict = event.model_dump(mode="json")
            await rabbit_conn.publish(routing_key="lesson.updated", message=event_dict)
            return updated_lesson
        except IntegrityError as e:
            logger.error(f"Integirity error while updating Lesson: {str(e)}")
            raise ConflictException("Lesson")

    async def delete(self, lesson_id: int):
        lesson = await self.lesson_repo.get_one_or_none_by_id(id=lesson_id)
        if not lesson:
            raise NotFoundException("Lesson", lesson_id)
        return await self.lesson_repo.delete(id=lesson_id)
