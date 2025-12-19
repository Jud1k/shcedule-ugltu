from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage
from pydantic_settings import BaseSettings, SettingsConfigDict
from loguru import logger


class Settings(BaseSettings):
    TELEGRAM_API_TOKEN: str
    ADMIN_ID: int
    DATABASE_URL: str
    BACKEND_API_URL: str = "http://localhost:8000/api/v1"
    RABBITMQ_URL: str = "amqp://guest:guest@localhost:5672/"

    model_config = SettingsConfigDict(
        env_file="../.env", env_ignore_empty=True, env_file_encoding="utf-8", extra="ignore"
    )


settings = Settings()

bot = Bot(token=settings.TELEGRAM_API_TOKEN)
dp = Dispatcher(storage=MemoryStorage())

format_log = "{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}"
logger.add("bot.log", format=format_log, level="INFO", rotation="10 MB")
