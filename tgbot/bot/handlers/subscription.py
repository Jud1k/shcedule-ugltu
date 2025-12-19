from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession

from bot.crud import find_user_by_tg_id, update_user
from bot.services.schemas import UserUpdate

router = Router()


@router.message(Command("subscribe"))
async def subscribe_user(message: Message, db_session: AsyncSession) -> None:
    """Enable notifications for schedule updates and changes"""
    user_id = message.from_user.id
    user = await find_user_by_tg_id(db_session, user_id)
    if not user:
        await message.answer(
            text="🔐 *Registration Required*\n\n"
            "You need to register first to manage notifications.\n\n"
            "👉 Use /register to create your account.",
            parse_mode="Markdown",
        )
        return
    if user.subscribed:
        await message.answer(
            text="🔔 *Notifications Already Active*\n\n"
            "You are already subscribed to schedule notifications.",
            parse_mode="Markdown",
        )
        return
    try:
        update_user_data = UserUpdate(subscribed=True)
        await update_user(db_session, user, update_user_data)
        logger.info(f"User {user_id} subscribed to notifications")
        await message.answer(
            text="✅ *Notifications Enabled!*\n\n"
            "🔔 You will now receive real-time updates about:\n"
            "⚡ Stay informed and never miss an update!",
            parse_mode="Markdown",
        )
    except Exception as e:
        logger.error(f"Failed to subscribe user {user_id}: {e}")

        await message.answer(
            "❌ *Subscription Failed*\n\n"
            "We couldn't update your notification preferences.\n\n"
            "🔄 *Please try again in a moment.*",
            parse_mode="Markdown",
        )


@router.message(Command("unsubscribe"))
async def unsubscribe_user(message: Message, db_session: AsyncSession) -> None:
    """Disable all schedule notifications while keeping account active"""
    user_id = message.from_user.id
    user = await find_user_by_tg_id(db_session, user_id)

    if not user:
        await message.answer(
            text="🔐 *Registration Required*\n\n"
            "You need to register first to manage notifications.\n\n"
            "👉 Use /register to create your account.",
            parse_mode="Markdown",
        )
        return
    if not user.subscribed:
        await message.answer(
            text="🔕 *Notifications Already Disabled*\n\n"
            "You are currently not receiving any notifications.\n\n"
            "👉 Use /subscribe to enable them again.",
            parse_mode="Markdown",
        )
        return
    try:
        update_user_data = UserUpdate(subscribed=True)
        await update_user(db_session, user, update_user_data)
        logger.info(f"User {user_id} unsubscribed from notifications")
        await message.answer(
            text="🔕 *Notifications Disabled*\n\n"
            "✅ You will no longer receive schedule updates.\n\n"
            "💡 *Your account remains active.*\n"
            "👉 Use /subscribe anytime to re-enable notifications.",
            parse_mode="Markdown",
        )
    except Exception as e:
        logger.error(f"Failed to unsubscribe user {user_id}: {e}")

        await message.answer(
            "❌ *Unsubscription Failed*\n\n"
            "We couldn't update your notification preferences.\n\n"
            "🔄 *Please try again in a moment.*",
            parse_mode="Markdown",
        )
