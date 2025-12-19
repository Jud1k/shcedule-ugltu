from loguru import logger
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from bot.models import User
from bot.services.schemas import UserCreate, UserUpdate


async def find_user_by_tg_id(session: AsyncSession, tg_id: str) -> User | None:
    query = select(User).filter(User.telegram_id == tg_id)
    result = await session.execute(query)
    user = result.scalar_one_or_none()
    return user


async def find_subscribed_users(
    session: AsyncSession, group_id: int, teacher_id: int
) -> list[User]:
    query = select(User).where(
        User.subscribed, or_(User.group_id == group_id, User.teacher_id == teacher_id)
    )
    result = await session.execute(query)
    users = result.scalars().all()
    logger.info(f"Find {len(users)} records")
    return list(users)


async def create_user(session: AsyncSession, user_in: UserCreate) -> User:
    create_user_data = user_in.model_dump()
    db_user = User(**create_user_data)
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    return db_user


async def update_user(session: AsyncSession, db_user: User, user_in: UserUpdate) -> User:
    update_user_data = user_in.model_dump(exclude_unset=True)

    for field, value in update_user_data.items():
        setattr(db_user, field, value)
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    return db_user


async def delete_user(session: AsyncSession, user: User) -> None:
    await session.delete(user)
    await session.commit()
