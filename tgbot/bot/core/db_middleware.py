from typing import Any, Awaitable, Callable
from aiogram import BaseMiddleware
from aiogram.types import Message, CallbackQuery

from bot.core.db import async_session_maker


class DatabaseMiddleware(BaseMiddleware):
    async def __call__(
        self,
        handler: Callable[[Message | CallbackQuery, dict[str, Any]], Awaitable[Any]],
        event: Message | CallbackQuery,
        data: dict[str, Any],
    ) -> Any:
        async with async_session_maker() as db_session:
            data["db_session"] = db_session
            try:
                result = await handler(event, data)
                return result
            except Exception as e:
                await db_session.rollback()
                raise e
            finally:
                await db_session.close()
