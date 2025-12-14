from aiogram import Router
from aiogram.types import Message
from aiogram.filters import Command
from loguru import logger
from sqlmodel import Session

from bot.db import find_user, delete_user

router = Router()


@router.message(Command("delete"))
async def cmd_delete(message: Message, db_session: Session):
    """Permanently delete user account and all associated data"""
    user_id = message.from_user.id
    user = find_user(db_session, user_id)

    if not user:
        await message.answer(
            text="❌ *Account Not Found*\n\n"
            "You are not registered in our system.\n"
            "Use /register to create an account first.",
            parse_mode="Markdown",
        )
        return
    try:
        delete_user(db_session, user)
        logger.info(f"User {user_id} deleted their account")
        await message.answer(
            text="🗑️ *Account Successfully Deleted*\n\n"
            "✅ Your account and all associated data have been permanently removed.\n\n"
            "📊 *What was deleted:*\n"
            "   • Personal information\n"
            "   • Notification preferences\n"
            "👋 Thank you for using our service!",
            parse_mode="Markdown",
        )
    except Exception as e:
        logger.error(f"Failed to delete user {user_id}: {e}")
        await message.answer(
            "❌ *Deletion Failed*\n\n"
            "We encountered an error while deleting your account.\n\n"
            "🔧 *Please try again or contact support.*",
            parse_mode="Markdown",
        )
