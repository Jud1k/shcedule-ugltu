import json
import logging
import time
import aio_pika
from aio_pika.abc import AbstractConnection, AbstractChannel, AbstractExchange


logger = logging.getLogger(__name__)


class RabbitMQConnection:
    def __init__(self, url):
        self.url = url
        self.connection: AbstractConnection | None = None
        self.chanel: AbstractChannel = None
        self.exchange: AbstractExchange = None

    async def connect(self) -> None:
        self.connection = await aio_pika.connect_robust(self.url)
        if self.connection is None:
            raise ConnectionError("Failed to initialize RabbitMQ connection")
        await self.connection.ready()
        self.chanel = await self.connection.channel()
        self.exchange = await self.chanel.declare_exchange(
            "schedule_updates", aio_pika.ExchangeType.TOPIC, durable=True
        )

    async def publish(self, routing_key: str, message: dict) -> None:
        if not self.exchange or not self.connection:
            await self.connect()
        message_body = json.dumps(message).encode()
        message_obj = aio_pika.Message(
            body=message_body,
            delivery_mode=aio_pika.DeliveryMode.PERSISTENT,
            content_type="application/json",
            timestamp=int(time.time()),
        )
        await self.exchange.publish(message=message_obj, routing_key=routing_key)
        logger.info(
            "Message published",
            extra={
                "routing_key": routing_key,
                "event_type": message.get("event_type"),
                "exchange": self.exchange.name,
            },
        )

    async def close(self) -> None:
        if self.connection:
            await self.connection.close()
