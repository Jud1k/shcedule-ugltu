from app.core.broker.publisher import RabbitMQPublisher
from app.core.config import settings
from app.core.broker.connection import RabbitMQConnection


broker_publisher = RabbitMQPublisher(rabbitmq_url=settings.rabbitmq_url)


async def get_broker() -> RabbitMQConnection:
    return broker_publisher.get_connection()
