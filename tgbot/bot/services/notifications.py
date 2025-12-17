from bot.core.config import bot
from bot.core.db import async_session_maker
from bot.crud import get_subscribed_users


async def handle_lesson_update(event_data: dict) -> None:
    async with async_session_maker() as session:
        subscribers = await get_subscribed_users(session)
        for user in subscribers:
            await bot.send_message(
                chat_id=user.telegram_id,
                text=f"Old lesson: {event_data.get('old_lesson')}\n\n"
                f"New lesson: {event_data.get('new_lesson')}\n\n"
                f"Changes: {event_data.get('changes')}",
                parse_mode=None
            )
