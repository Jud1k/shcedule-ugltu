import logging

from app.cache.custom_redis import CustomRedis

logger = logging.getLogger(__name__)


class RedisClient:
    """Class for managing Redis connections with support for automatic and explicit management."""

    def __init__(
        self,
        host: str,
        port: int,
        ssl_flag: bool,
    ):
        self.host = host
        self.port = port
        self.ssl_flag = ssl_flag
        self._client = None

    async def connect(self):
        """Create connection to redis"""
        if self._client is None:
            try:
                self._client = CustomRedis(
                    host=self.host,
                    port=self.port,
                    ssl=self.ssl_flag,
                    retry_on_timeout=True,
                    health_check_interval=30,
                    decode_responses=True,
                )
                await self._client.ping()
            except Exception as e:
                logger.error(f"Error connecting to Redis: {e}")
                raise

    async def close(self):
        """Close conntcion to Redis."""
        if self._client:
            await self._client.aclose()
            self._client = None

    def get_client(self) -> CustomRedis:
        """Return instacne CustomeClient Redis."""
        if self._client is None:
            raise RuntimeError("Redis client not initialize. Check lifespan.")
        return self._client

    async def __aenter__(self):
        """Support async context manager."""
        await self.connect()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Automaticly close connection on exit from context."""
        await self.close()
