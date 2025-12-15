from datetime import datetime
from typing import AsyncGenerator
from sqlalchemy import TIMESTAMP, TextClause, func, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from bot.core.config import settings

async_engine = create_async_engine(str(settings.DATABASE_URL), echo=True)

async_session_maker = async_sessionmaker(async_engine, class_=AsyncSession, expire_on_commit=False)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


class Base(DeclarativeBase):
    __abstract__ = True

    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, server_default=func.now(), onupdate=datetime.now
    )


async def init_db() -> None:
    # async with async_engine.begin() as conn:
    #     await conn.run_sync(Base.metadata.drop_all)
    #     await conn.run_sync(Base.metadata.create_all)
    #     await conn.execute(delete_all_users())
    #     await conn.commit()
    pass


def delete_all_users() -> TextClause:
    query = text("DELETE FROM user WHERE id>0")
    return query
