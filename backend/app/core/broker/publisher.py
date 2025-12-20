import logging
from app.core.broker.connection import RabbitMQConnection

logger = logging.getLogger(__name__)


class RabbitMQPublisher:
    def __init__(self, rabbitmq_url):
        self.rabbitmq_url = rabbitmq_url
        self.broker = None

    async def connect(self) -> None:
        if not self.broker:
            try:
                self.broker = RabbitMQConnection(url=self.rabbitmq_url)
                await self.broker.connect()
            except Exception as e:
                logger.error(f"Error connect to broker: {e}")
                raise e

    def get_connection(self) -> RabbitMQConnection:
        if not self.broker:
            raise RuntimeError("Rabbitmq not initialize. Check lifespan.")
        return self.broker

    async def close(self) -> None:
        if self.broker:
            await self.broker.close()
            self.broker = None
