def get_teacher_fullname(teacher: dict) -> str:
    first_name = teacher.get("first_name")
    last_name = teacher.get("last_name")
    middle_name = teacher.get("middle_name", "")

    if not middle_name:
        return last_name + " " + first_name[0] + "."

    return last_name + " " + first_name[0] + ". " + middle_name[0] + "."
