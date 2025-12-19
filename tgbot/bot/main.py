import asyncio
from aiogram.types import BotCommand, BotCommandScopeDefault
from aiohttp import ClientSession, ClientTimeout
from loguru import logger

from bot.core.db import init_db
from bot.core.config import settings, bot, dp
from bot.core.db_middleware import DatabaseMiddleware
from bot.handlers.start import router as start_router
from bot.handlers.register_flow import router as register_router
from bot.handlers.delete import router as delete_router
from bot.handlers.help import router as help_router
from bot.handlers.subscription import router as subscription_router
from bot.core.consumer import RabbitMQConsumer
from bot.tasks.router import message_router


async def set_default_commands() -> None:
    commands = [
        BotCommand(command="start", description="Just start command."),
        BotCommand(
            command="help", description="Print avaliable commands and some information about bot."
        ),
        BotCommand(
            command="register",
            description="Register user for receiving notification about updating schedule.",
        ),
    ]
    await bot.set_my_commands(commands=commands, scope=BotCommandScopeDefault())


async def on_startup() -> None:
    await init_db()
    await set_default_commands()
    try:
        await bot.send_message(chat_id=settings.ADMIN_ID, text="I'm working!!!")
    except Exception as e:
        logger.error(f"Error while sending message to admin:{str(e)}")
    logger.info("Bot successfully started!")


async def on_shutdown() -> None:
    try:
        await bot.send_message(chat_id=settings.ADMIN_ID, text="I'm stopped working!!!")
    except Exception as e:
        logger.error(f"Error while sending message to admin:{str(e)}")
    logger.info("Bot stopped!")


def register_routes() -> None:
    dp.include_router(register_router)
    dp.include_router(start_router)
    dp.include_router(help_router)
    dp.include_router(subscription_router)
    dp.include_router(delete_router)


async def main() -> None:
    client_session = ClientSession(timeout=ClientTimeout(30))
    register_routes()
    dp.update.middleware.register(DatabaseMiddleware())
    dp.startup.register(on_startup)
    dp.shutdown.register(on_shutdown)

    consumer = RabbitMQConsumer(settings.RABBITMQ_URL)
    worker_task = asyncio.create_task(
        consumer.consume_queue(
            queue_name="telegram_notifications",
            routing_keys=["lesson.#"],
            message_router=message_router,
        )
    )
    try:
        await dp.start_polling(
            bot, allowed_updates=dp.resolve_used_update_types(), client_session=client_session
        )
    finally:
        await bot.session.close()
        await client_session.close()
        await consumer.close()
        worker_task.cancel()


if __name__ == "__main__":
    asyncio.run(main())
