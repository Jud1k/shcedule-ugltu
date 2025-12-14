from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder

from bot.handlers.utils import get_teacher_fullname


def get_role_keyboard() -> InlineKeyboardMarkup:
    kb = [
        [
            InlineKeyboardButton(text="🎓 Student", callback_data="role_student"),
            InlineKeyboardButton(text="👨‍🏫 Teacher", callback_data="role_teacher"),
        ]
    ]
    return InlineKeyboardMarkup(inline_keyboard=kb)


def get_groups_keyboard(groups: list, page: int = 0, page_size: int = 5) -> InlineKeyboardMarkup:
    """Create keyboard with pagination for groups"""
    total = len(groups)
    pages = max(1, (total + page_size - 1) // page_size)

    start = page * page_size
    end = start + page_size
    page_groups = groups[start:end]

    kb = InlineKeyboardBuilder()
    for group in page_groups:
        kb.button(text=f"🎓 {group['name']}", callback_data=f"select_group:{group['id']}")
    kb.adjust(2)

    nav_buttons = []
    if page > 0:
        nav_buttons.append(("◀️ Пред.", f"groups_page:{page - 1}"))

    if page < pages - 1:
        nav_buttons.append(("След. ▶️", f"groups_page:{page + 1}"))

    for text, data in nav_buttons:
        kb.button(text=text, callback_data=data)

    kb.adjust(3)
    return kb.as_markup()


def get_teachers_keyboard(teachers: list, page=0, page_size=5) -> InlineKeyboardMarkup:
    """Create keyboard with pagination for teachers"""
    total = len(teachers)
    pages = max(1, (total + page_size - 1) // page_size)

    start = page * page_size
    end = start + page_size
    teacher_groups = teachers[start:end]

    kb = InlineKeyboardBuilder()
    for teacher in teacher_groups:
        kb.button(
            text=f"🎓 {get_teacher_fullname(teacher)}",
            callback_data=f"select_teacher:{teacher['id']}",
        )
    kb.adjust(2)

    nav_buttons = []
    if page > 0:
        nav_buttons.append(("◀️ Пред.", f"teachers_page:{page - 1}"))

    if page < pages - 1:
        nav_buttons.append(("След. ▶️", f"teachers_page:{page + 1}"))

    for text, data in nav_buttons:
        kb.button(text=text, callback_data=data)

    kb.adjust(3)
    return kb.as_markup()


def get_confirmation_keyboard() -> InlineKeyboardMarkup:
    """Create keyboard for confirmation process"""
    kb = InlineKeyboardBuilder()
    kb.button(text="✅ Confirm", callback_data="confirm")
    kb.button(text="❌ Cancel", callback_data="cancel")
    kb.button(text="🔙 Go Back", callback_data="back_to_selection")
    kb.adjust(1)
    return kb.as_markup()
