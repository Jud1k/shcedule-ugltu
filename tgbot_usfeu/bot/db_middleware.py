from typing import Any, Awaitable, Callable
from aiogram import BaseMiddleware
from aiogram.types import Message, CallbackQuery
from sqlmodel import Session

from bot.db import engine


class DatabaseMiddleware(BaseMiddleware):
    async def __call__(
        self,
        handler: Callable[[Message | CallbackQuery, dict[str, Any]], Awaitable[Any]],
        event: Message | CallbackQuery,
        data: dict[str, Any],
    ):
        with Session(engine) as db_session:
            data["db_session"] = db_session
            try:
                result = await handler(event, data)
                return result
            except Exception as e:
                db_session.rollback()
                raise e
            finally:
                db_session.close()
