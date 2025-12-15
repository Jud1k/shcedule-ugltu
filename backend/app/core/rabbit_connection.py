import json
import logging
import time
import aio_pika
from aio_pika.abc import AbstractConnection, AbstractChannel, AbstractExchange

from app.core.config import settings

logger = logging.getLogger(__name__)


class RabbitConnection:
    def __init__(self, url):
        self.url = url
        self.connection: AbstractConnection | None = None
        self.chanel: AbstractChannel = None
        self.exchange: AbstractExchange = None

    async def connect(self) -> None:
        self.connection = await aio_pika.connect_robust(self.url)
        self.chanel = await self.connection.channel()
        self.exchange = await self.chanel.declare_exchange(
            "schedule_updates", aio_pika.ExchangeType.TOPIC, durable=True
        )

    async def publish(self, routing_key: int, message: dict):
        if not self.exchange:
            await self.connect()
        message_body = json.dumps(message).encode()
        message_obj = aio_pika.Message(
            body=message_body,
            delivery_mode=aio_pika.DeliveryMode.PERSISTENT,
            content_type="application/json",
            timestamp=int(time.time()),
        )
        await self.exchange.publish(message=message_obj, routing_key=routing_key)
        logger.info(f"Data sent to {routing_key}:{message.get('event_type')}")

    async def close(self):
        if self.connection:
            await self.connection.close()


rabbit_conn = RabbitConnection(url=settings.rabbitmq_url)
