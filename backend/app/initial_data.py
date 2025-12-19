import asyncio
from app.domain.auth.utils import get_password_hash
from app.domain.building.repository import BuildingRepository
from app.domain.building.schemas import BuildingCreate
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import engine
from app.db.models import Building, User
from app.core.config import settings
from app.domain.auth.repository import UserRepository
from app.domain.auth.schemas import UserCreate


async def init():
    async with AsyncSession(engine) as session:
        result = await session.execute(select(User).where(User.email == settings.FIRST_SUPERUSER))
        user = result.scalar_one_or_none()
        if not user:
            new_password = get_password_hash(settings.FIRST_SUPERUSER_PASSWORD)
            user_in = UserCreate(
                email=settings.FIRST_SUPERUSER, password=new_password, role="admin"
            )
            user_repo = UserRepository(session)
            await user_repo.create(user_in)
        building_in = BuildingCreate(name="ГУК", address="Сибирский тракт 38")
        result = await session.execute(select(Building).where(Building.name == building_in.name))
        building = result.scalar_one_or_none()

        if not building:
            building_repo = BuildingRepository(session)
            await building_repo.create(building_in)
        await session.commit()


async def main():
    print("Creating initial data")
    await init()
    print("Initial data created")


if __name__ == "__main__":
    asyncio.run(main())
