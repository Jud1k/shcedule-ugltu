from app.core.broker.publisher import RabbitMQPublisher
from app.core.config import settings
from app.core.broker.connection import RabbitMQConnection


message_publisher = RabbitMQPublisher(rabbitmq_url=settings.rabbitmq_url)


async def get_publisher() -> RabbitMQConnection:
    return message_publisher.get_connection()
