from aiogram import Router
from aiogram.types import Message
from sqlalchemy.ext.asyncio import AsyncSession
from aiogram.filters import CommandStart

from bot.crud import find_user

router = Router()


@router.message(CommandStart())
async def cmd_start(message: Message, db_session: AsyncSession):
    user_id = message.from_user.id
    user = await find_user(db_session, user_id)

    if user:
        return await message.answer(
            f"👋 Welcome back, {message.from_user.full_name}!\n\n"
            f"🎓 You are registered as a {user.role}\n"
            f"🔔 Notifications: {'✅ Enabled' if user.subscribed else '❌ Disabled'}\n\n"
            f"Use /help to see all available commands!"
        )
    else:
        await message.answer(
            text="Welcome to bot!\n"
            "This bot was created for send you notification about changes in schedule in USFEU\n"
            "If you want to want receive notification, go to /register\n\n"
            "🔔 *Get notified instantly when:*\n"
            "   • Classes are rescheduled\n"
            "   • Rooms are changed\n"
            "   • New lessons are added\n"
            "   • Cancellations occur\n\n"
            "📝 *To start receiving notifications:*\n"
            "   Use /register to set up your profile\n\n"
            "📚 *Available commands:*\n"
            "   /start - Welcome message\n"
            "   /help - Show all commands\n"
            "   /register - Register for notifications\n"
            "   /subscribe - Subscribe for notifications\n"
            "   /unsubscribe - Unsubscribe for notifications\n"
            "   /delete - Remove your account\n"
            "⚡ *Stay informed, stay ahead!*",
            parse_mode="Markdown",
        )
