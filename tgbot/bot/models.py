import uuid
from sqlalchemy import UUID, Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from bot.core.db import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    telegram_id: Mapped[int] = mapped_column(Integer, unique=True)
    username: Mapped[str] = mapped_column(String, nullable=True)
    role: Mapped[str] = mapped_column(String, nullable=True)
    group_id: Mapped[int] = mapped_column(Integer, nullable=True)
    teacher_id: Mapped[int] = mapped_column(Integer, nullable=True)
    subscribed: Mapped[bool] = mapped_column(Boolean, default=False)
