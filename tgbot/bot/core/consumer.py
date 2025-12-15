from contextlib import asynccontextmanager
import json
from typing import AsyncGenerator, Awaitable, Callable
import aio_pika
from aio_pika.abc import AbstractConnection, AbstractChannel
from loguru import logger


class RabbitMQConsumer:
    def __init__(self, rabbitmq_url: str):
        self.rabbitmq_url = rabbitmq_url
        self.connection: AbstractConnection = None
        self.channel: AbstractChannel = None

    async def connect(self) -> AbstractChannel:
        self.connection = await aio_pika.connect_robust(url=self.rabbitmq_url)
        self.channel = await self.connection.channel()
        return self.channel

    @asynccontextmanager
    async def _get_channel(self) -> AsyncGenerator[AbstractChannel, None]:
        """Context manager for channel"""
        if not self.channel:
            await self.connect()
        yield self.channel

    async def consume_queue(
        self,
        queue_name: str,
        handler: Callable[[dict], Awaitable[None]],
        routing_keys: list[str] = None,
    ) -> None:
        async with self._get_channel() as channel:
            await channel.set_qos(prefetch_count=10)

            exchange = await channel.declare_exchange(
                name="schedule_updates", type=aio_pika.ExchangeType.TOPIC, durable=True
            )
            queue = await channel.declare_queue(
                name=queue_name,
                durable=True,
                arguments={
                    "x-dead-letter-exchange": "dlx",
                    "x-dead-letter-routing-key": "dead_letters",
                },
            )
            if routing_keys:
                for key in routing_keys:
                    await queue.bind(exchange=exchange, routing_key=key)
            logger.info(f"Started consuming {queue_name}")
            async with queue.iterator() as queue_iter:
                async for message in queue_iter:
                    async with message.process():
                        try:
                            body = json.loads(message.body.decode())
                            await handler(body)
                        except Exception as e:
                            logger.error(f"Message processing failed: {e}")
                            await message.nack(requeue=False)

    async def close(self):
        if self.connection:
            await self.connection.close()
