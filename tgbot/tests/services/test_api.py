from aioresponses import aioresponses
import pytest
from aiohttp import ClientSession
from bot.services import api

url = api.api_url


@pytest.mark.asyncio
async def test_get_groups_success(client: ClientSession):
    mock_response = [{"id": 1, "name": "Name", "course": 2, "institute": "Institute"}]
    with aioresponses() as m:
        m.get(f"{url}/group/", status=200, payload=mock_response)
        result = await api.get_groups(client)

        assert result is not None
        assert len(result) == 1
        assert result[0].id == mock_response[0]["id"]
        assert result[0].name == mock_response[0]["name"]
        assert result[0].course == mock_response[0]["course"]
        assert result[0].institute == mock_response[0]["institute"]


@pytest.mark.asyncio
async def test_get_groups_error(client: ClientSession):
    mock_response = {"detail": "Detail"}
    with aioresponses() as m:
        m.get(f"{url}/group/", status=404, payload=mock_response)
        result = await api.get_groups(client)
        assert result is None


@pytest.mark.asyncio
async def test_get_teachers_success(client: ClientSession):
    mock_response = [
        {
            "id": 1,
            "first_name": "FirstName",
            "last_name": "LastName",
            "middle_name": "MiddleName",
            "department": "Department",
            "email": "example@mail.com",
            "phone": "123456",
            "title": "Title",
        }
    ]

    with aioresponses() as m:
        m.get(f"{url}/teacher/", status=200, payload=mock_response)
        result = await api.get_teachers(client)
        assert result is not None
        assert result[0].id == mock_response[0]["id"]
        assert result[0].first_name == mock_response[0]["first_name"]
        assert result[0].last_name == mock_response[0]["last_name"]
        assert result[0].middle_name == mock_response[0]["middle_name"]
        assert result[0].department == mock_response[0]["department"]
        assert result[0].email == mock_response[0]["email"]
        assert result[0].phone == mock_response[0]["phone"]
        assert result[0].title == mock_response[0]["title"]


@pytest.mark.asyncio
async def test_get_teachers_error(client: ClientSession):
    mock_response = {"detail": "Detail"}
    with aioresponses() as m:
        m.get(f"{url}/teacher/", status=404, payload=mock_response)
        result = await api.get_teachers(client)
        assert result is None
