from aiohttp import ClientSession
from loguru import logger

from bot.core.config import settings
from bot.services.schemas import Group, Teacher

api_url = settings.BACKEND_API_URL


async def get_groups(client_session: ClientSession) -> list[Group] | None:
    async with client_session.get(f"{api_url}/group/") as response:
        body = await response.json()
        if response.status == 200:
            groups = [Group(**record) for record in body]
            return groups
        else:
            logger.error(f"Error while fetching groups: {body['detail']}")
            return None


async def get_teachers(client_session: ClientSession) -> list[Teacher] | None:
    async with client_session.get(f"{api_url}/teacher/") as response:
        body = await response.json()
        if response.status == 200:
            teachers = [Teacher(**record) for record in body]
            return teachers
        else:
            logger.error(f"Error while fetching teachers: {body['detail']}")
            return None
