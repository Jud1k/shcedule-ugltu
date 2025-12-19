import random
import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from bot import crud
from bot.services.schemas import UserCreate, UserUpdate
from tests.utils import create_test_user


@pytest.mark.asyncio
async def test_find_user_by_tg_id_not_found(session: AsyncSession):
    tg_id = random.randint(1, 1_000_000)
    user = await crud.find_user_by_tg_id(session, tg_id)
    assert user is None


@pytest.mark.asyncio
async def test_find_user_by_tg_id_success(session: AsyncSession):
    created_user = await create_test_user(session)
    user = await crud.find_user_by_tg_id(session, created_user.telegram_id)
    assert user.id == created_user.id
    assert user.group_id == created_user.group_id
    assert user.teacher_id == created_user.teacher_id
    assert user.role == created_user.role
    assert user.telegram_id == created_user.telegram_id
    assert user.username == created_user.username
    assert user.subscribed == created_user.subscribed


@pytest.mark.asyncio
async def test_find_subscribed_users(session: AsyncSession):
    created_subscribed_user = await create_test_user(session, is_subscribed=True)
    subscribed_users = await crud.find_subscribed_users(
        session,
        group_id=created_subscribed_user.group_id,
        teacher_id=created_subscribed_user.teacher_id,
    )
    assert subscribed_users[0].group_id == created_subscribed_user.group_id
    assert subscribed_users[0].teacher_id == created_subscribed_user.teacher_id
    assert subscribed_users[0].role == created_subscribed_user.role
    assert subscribed_users[0].telegram_id == created_subscribed_user.telegram_id
    assert subscribed_users[0].username == created_subscribed_user.username
    assert subscribed_users[0].subscribed == created_subscribed_user.subscribed


@pytest.mark.asyncio
async def test_create_user(session: AsyncSession, user_data: UserCreate):
    created_user = await crud.create_user(session, user_data)

    assert user_data.group_id == created_user.group_id
    assert user_data.teacher_id == created_user.teacher_id
    assert user_data.role == created_user.role
    assert user_data.telegram_id == created_user.telegram_id
    assert user_data.username == created_user.username
    assert user_data.subscribed == created_user.subscribed


@pytest.mark.asyncio
async def test_update_user_success(session: AsyncSession):
    created_user = await create_test_user(session)
    new_user_data = UserUpdate(
        telegram_id=1,
        username="new username",
        role="new role",
        group_id=1,
        teacher_id=1,
        subscribed=False,
    )
    updated_user = await crud.update_user(session, created_user, new_user_data)
    assert updated_user.group_id == new_user_data.group_id
    assert updated_user.teacher_id == new_user_data.teacher_id
    assert updated_user.role == new_user_data.role
    assert updated_user.telegram_id == new_user_data.telegram_id
    assert updated_user.username == new_user_data.username
    assert updated_user.subscribed == new_user_data.subscribed


@pytest.mark.asyncio
async def test_delete_user_success(session: AsyncSession):
    created_user = await create_test_user(session)

    result = await crud.delete_user(session, created_user)
    assert result is None
