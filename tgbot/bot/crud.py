from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from bot.models import User


async def find_user(session: AsyncSession, tg_id: str) -> User | None:
    query = select(User).filter(User.telegram_id == tg_id)
    result = await session.execute(query)
    user = result.scalar_one_or_none()
    return user


async def create_user(session: AsyncSession, user: User) -> User:
    session.add(user)
    await session.commit()
    return user


async def update_user(session: AsyncSession, user: User) -> User:
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user


async def delete_user(session: AsyncSession, user: User) -> None:
    await session.delete(user)
    await session.commit()


async def get_subscribed_users(session: AsyncSession) -> list[User]:
    query = select(User).filter(User.subscribed)
    results = await session.execute(query)
    users = results.scalars().all()
    return users
