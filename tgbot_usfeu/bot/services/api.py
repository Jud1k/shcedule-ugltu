from aiohttp import ClientSession
from loguru import logger

from bot.config import settings
from bot.models import Groups, Teachers

api_url = settings.BACKEND_API_URL


async def get_groups(client_session: ClientSession) -> list[Groups] | None:
    async with client_session.get(f"{api_url}/group/") as response:
        body = await response.json()
        if response.status == 200:
            groups = [Groups(**record) for record in body]
            return groups
        else:
            logger.error(f"Error while fetching groups: {body['detail']}")
            return None


async def get_teachers(client_session: ClientSession) -> list[Teachers] | None:
    async with client_session.get(f"{api_url}/teacher/") as response:
        body = await response.json()
        if response.status == 200:
            teachers = [Teachers(**record) for record in body]
            return teachers
        else:
            logger.error(f"Error while fetching teachers: {body['detail']}")
            return None
