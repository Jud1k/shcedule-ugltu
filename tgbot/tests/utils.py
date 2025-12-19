from sqlalchemy.ext.asyncio import AsyncSession

from bot.models import User
from bot.services.schemas import UserCreate


async def create_test_user(session: AsyncSession, is_subscribed: bool = False) -> User:
    user_in = UserCreate(
        telegram_id=1,
        username="username",
        role="role",
        group_id=1,
        teacher_id=1,
        subscribed=is_subscribed,
    )
    a = user_in.model_dump()
    db_user = User(**a)
    session.add(db_user)
    await session.flush()
    return db_user
