import json
from aio_pika.abc import AbstractIncomingMessage
from loguru import logger

from bot.core.events.base import IncomingEventType
from bot.tasks.handle_lesson_update import handle_lesson_update


async def message_router(message: AbstractIncomingMessage) -> None:
    async with message.process():
        try:
            body = json.loads(message.body.decode())
            if body.get("event_type") == IncomingEventType.LESSON_UPDATED:
                return await handle_lesson_update(body)
        except Exception as e:
            logger.error(f"Message processing failed: {e}")
            await message.nack(requeue=False)
