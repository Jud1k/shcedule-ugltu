from aiogram import Router
from aiogram.types import Message
from aiogram.filters import Command

router = Router()


@router.message(Command("help"))
async def cmd_help(message: Message):
    await message.answer(
        text="📚 *Available commands:*\n"
        "   /start - Welcome message\n"
        "   /help - Show all commands\n"
        "   /register - Register for notifications\n"
        "   /subscribe - Subscribe for notifications\n"
        "   /unsubscribe - Unsubscribe for notifications\n"
        "   /delete - Remove your account"
    )
