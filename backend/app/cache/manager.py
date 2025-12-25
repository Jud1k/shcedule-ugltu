from app.core.config import settings
from app.cache.client import RedisClient

from app.cache.custom_redis import CustomRedis

redis_manager = RedisClient(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    ssl_flag=settings.REDIS_SSL,
)


async def get_redis() -> CustomRedis:
    """Dependency function for obtaining Redis client"""
    return redis_manager.get_client()
