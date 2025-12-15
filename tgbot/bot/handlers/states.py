from aiogram.fsm.state import State, StatesGroup


class RegistrationStates(StatesGroup):
    choose_role = State()
    student_group = State()
    teacher_select = State()
    confirm_data = State()
