from bot.core.config import bot
from bot.core.db import async_session_maker
from bot.crud import find_subscribed_users
from bot.core.events.lesson import LessonUpdatedEvent
from bot.services.utils import format_lesson_info


async def handle_lesson_update(event_data: dict) -> None:
    async with async_session_maker() as session:
        event = LessonUpdatedEvent.model_validate(event_data)
        group_id = event.group_id
        teacher_id = event.teacher_id
        old_lesson_text = format_lesson_info(event.old_lesson)
        new_lesson_text = format_lesson_info(event.new_lesson)
        subscribers = await find_subscribed_users(session, group_id, teacher_id)
        for user in subscribers:
            await bot.send_message(
                chat_id=user.telegram_id,
                text=f"🔄 Lesson updated\n\n"
                "📋 Before:\n\n"
                f"{old_lesson_text}\n"
                "📋 After:\n\n"
                f"{new_lesson_text}\n\n"
                "Use /unsubscribe command to disable notifications",
            )
