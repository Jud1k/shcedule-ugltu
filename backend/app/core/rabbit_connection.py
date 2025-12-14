from aio_pika.abc import AbstractConnection


class RabbitConnection:
    def __init__(self, url=""):
        self.url = url
        self.connection: AbstractConnection | None = None
        self.chanel = None
        self.exchange = None

    