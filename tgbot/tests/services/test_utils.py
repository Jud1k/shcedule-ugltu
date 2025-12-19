import pytest
from bot.services.schemas import Teacher
from bot.services import utils


def test_get_teacher_fullname():
    first_name = "FirstName"
    last_name = "LastName"
    middle_name = "MiddleName"
    excpected_fullname = last_name + " " + first_name[0] + ". " + middle_name[0] + "."
    teacher = Teacher(
        first_name=first_name,
        last_name=last_name,
        middle_name=middle_name,
        email="example@mail.com",
        phone="12345",
        department="department",
        title="title",
    )
    fullname = utils.get_teacher_fullname(teacher)
    assert fullname == excpected_fullname

    teacher_without_middlename = Teacher(
        first_name=first_name,
        last_name=last_name,
        email="example@mail.com",
        phone="12345",
        department="department",
        title="title",
    )
    fullname = utils.get_teacher_fullname(teacher_without_middlename)
    excpected_fullname = last_name + " " + first_name[0] + "."
    assert fullname == excpected_fullname


@pytest.mark.parametrize(
    "day_number,excpected_name",
    [
        (1, "Monday"),
        (2, "Tuesday"),
        (3, "Wednesday"),
        (4, "Thursday"),
        (5, "Friday"),
        (6, "Saturday"),
        (7, "Day 7"),
        (0, "Day 0"),
    ],
)
def test_get_weekday_name(day_number, excpected_name):
    assert utils.get_weekday_name(day_number) == excpected_name


@pytest.mark.parametrize(
    "time_id,excepcted_period",
    [
        (1, "9-10:35"),
        (2, "10:45-12:20"),
        (3, "13:20-14:55"),
        (4, "15:10-16:45"),
        (5, "16:55-18:30"),
        (6, "18:40-20:15"),
        (7, "Time 7"),
        (0, "Time 0"),
    ],
)
def test_get_time_period(time_id, excepcted_period):
    assert utils.get_time_period(time_id) == excepcted_period
