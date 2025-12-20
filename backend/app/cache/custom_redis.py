import json
import logging

from collections.abc import Awaitable, Callable
from typing import Any
from redis.asyncio import Redis

logger = logging.getLogger(__name__)


class CustomRedis(Redis):
    """Extended Redis class with additional methods"""

    async def delete_key(self, key: str):
        """"Deletes a key from Redis."""
        await self.delete(key)
        logger.info(f"Key {key} deleted")

    async def delete_keys_by_prefix(self, prefix: str):
        """Deletes keys starting with the specified prefix."""
        keys = await self.keys(prefix + "*")
        if keys:
            await self.delete(*keys)
            logger.info(f"Keys starting with {prefix} deleted")

    async def delete_all_keys(self):
        """Deletes all keys from the current Redis database."""
        await self.flushdb()
        logger.info("All keys deleted from the current database")

    async def get_value(self, key: str):
        """Returns the value of a key from Redis."""
        value = await self.get(key)
        if value:
            return value
        else:
            logger.info(f"Key {key} not found")
            return None

    async def set_value(self, key: str, value: str):
        """Sets the value of a key in Redis."""
        await self.set(key, value)
        logger.info(f"Value set for key {key}")

    async def set_value_with_ttl(self, key: str, ttl: int, value: str):
        """Sets the value of a key with time-to-live in Redis."""
        await self.setex(key, ttl, value)
        logger.info(f"Value set for key {key} with TTL {ttl}")

    async def exists(self, key: str) -> bool:
        """Checks if a key exists in Redis."""
        return await super().exists(key)

    async def get_keys(self, pattern: str = "*"):
        """Returns a list of keys matching the pattern."""
        return await self.keys(pattern)

    async def get_cached_data(
        self,
        cache_key: str,
        fetch_data_func: Callable[..., Awaitable[Any]],
        *args,
        ttl: int = 1800,
        **kwargs,
    ) -> Any:
        """
        Retrieves data from Redis cache or from database if not in cache.

        Args:
            cache_key: Key for caching data
            fetch_data_func: Async function to retrieve data from database
            *args: Positional arguments for fetch_data_func
            ttl: Cache time-to-live in seconds (default 30 minutes)
            **kwargs: Keyword arguments for fetch_data_func

        Returns:
            Data from cache or from database
        """
        cached_data = await self.get(cache_key)

        if cached_data:
            logger.info(f"Data retrieved from cache for key: {cache_key}")
            return json.loads(cached_data)
        else:
            logger.info(f"Data not found in cache for key: {cache_key}, retrieving from source")
            data = await fetch_data_func(*args, **kwargs)
            if data is None:
                return data
            
            if isinstance(data, list):
                processed_data = [
                    item.to_dict() if hasattr(item, "to_dict") else item for item in data
                ]
            else:
                processed_data = data.to_dict() if hasattr(data, "to_dict") else data

            await self.setex(cache_key, ttl, json.dumps(processed_data))
            logger.info(f"Data saved to cache for key: {cache_key} with TTL: {ttl} seconds")

            return processed_data
