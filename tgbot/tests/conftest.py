from typing import AsyncGenerator
from aiohttp import ClientSession
import pytest
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    AsyncEngine,
    create_async_engine,
    async_sessionmaker,
)
from sqlalchemy import StaticPool

from bot.core.db import Base
from bot.services.schemas import UserCreate


@pytest.fixture(scope="function", autouse=True)
async def engine() -> AsyncGenerator[AsyncEngine, None]:
    engine = create_async_engine(
        "sqlite+aiosqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    yield engine
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    await engine.dispose()


@pytest.fixture
async def session_maker(engine) -> async_sessionmaker:
    return async_sessionmaker(
        bind=engine, class_=AsyncSession, expire_on_commit=False, autoflush=False
    )


@pytest.fixture
async def session(session_maker) -> AsyncGenerator[AsyncSession, None]:
    async with session_maker() as session:
        try:
            yield session
            await session.rollback()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


@pytest.fixture(scope="function")
async def client() -> AsyncGenerator[ClientSession, None]:
    async with ClientSession() as session:
        yield session


@pytest.fixture
def user_data() -> UserCreate:
    user = UserCreate(
        telegram_id=1, username="username", role="role", group_id=1, teacher_id=1, subscribed=False
    )
    return user
