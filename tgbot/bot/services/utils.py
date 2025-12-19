from bot.services.schemas import Lesson, Teacher


def get_teacher_fullname(teacher: Teacher) -> str:
    first_name = teacher.first_name
    last_name = teacher.last_name
    middle_name = teacher.middle_name

    if not middle_name:
        return last_name + " " + first_name[0] + "."

    return last_name + " " + first_name[0] + ". " + middle_name[0] + "."


def get_weekday_name(weekday_number: int) -> str:
    weekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]
    return weekdays[weekday_number - 1] if 1 <= weekday_number <= 6 else f"Day {weekday_number}"


def get_time_period(time_id: int) -> str:
    time_periods = [
        "9-10:35",
        "10:45-12:20",
        "13:20-14:55",
        "15:10-16:45",
        "16:55-18:30",
        "18:40-20:15",
    ]
    return time_periods[time_id - 1] if 1 <= time_id <= 6 else f"Time {time_id}"


def format_lesson_info(lesson: Lesson) -> str:
    subject_name = lesson.subject.name
    teacher_fullname = get_teacher_fullname(lesson.teacher)
    group_name = lesson.group.name
    room_name = lesson.room.name
    time_period = get_time_period(lesson.time_id)
    lesson_type = lesson.type
    weekday = get_weekday_name(lesson.day_of_week)

    return (
        f"📚 Subject: {subject_name}\n"
        f"👨‍🏫 Teacher: {teacher_fullname}\n"
        f"👥 Group: {group_name}\n"
        f"🏢 Classroom: {room_name}\n"
        f"📅 Time: {time_period}\n"
        f"🎯 Type: {lesson_type}\n"
        f"📆 Weekday: {weekday}"
    )
