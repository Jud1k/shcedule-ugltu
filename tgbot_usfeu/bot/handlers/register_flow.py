from aiogram import Router, F
from aiogram.filters import StateFilter, Command
from aiogram.types import CallbackQuery, Message
from aiogram.fsm.context import FSMContext
from aiohttp import ClientSession
from loguru import logger
from sqlmodel import Session

from bot.db import create_user, find_user
from bot.handlers.states import RegistrationStates
from bot.handlers.utils import get_teacher_fullname
from bot.keyboards.inline import (
    get_confirmation_keyboard,
    get_groups_keyboard,
    get_role_keyboard,
    get_teachers_keyboard,
)
from bot.models import User
from bot.services.api import get_groups, get_teachers

router = Router()


@router.message(Command("register"))
async def register_user(message: Message, db_session: Session, state: FSMContext):
    """Register user in system"""
    user_id = message.from_user.id
    user = find_user(db_session, user_id)

    if user:
        await message.answer(
            "✅ *You're already registered!*\n\n"
            f"👤 *Profile Details:*\n"
            f"   • Role: {user.role.title()}\n"
            f"   • Status: {'Active 🔔' if user.subscribed else 'Inactive 🔕'}\n\n"
            "📋 *What you can do now:*\n"
            "   • View your schedule\n"
            "   • Get instant notifications\n",
            parse_mode="Markdown",
        )
        await state.clear()
    else:
        await message.answer(
            "👋 *Welcome to Registration!*\n\n"
            "📝 Let's get you set up to receive schedule notifications.\n\n"
            "🎯 *First, tell us who you are:*\n"
            "   Are you a student or a teacher?\n\n"
            "👉 Please select your role below:",
            reply_markup=get_role_keyboard(),
            parse_mode="Markdown",
        )
        await state.set_state(RegistrationStates.choose_role)


@router.callback_query(StateFilter(RegistrationStates.choose_role), F.data == "role_student")
async def process_student_role(
    callback: CallbackQuery, client_session: ClientSession, state: FSMContext
):
    """User selects student role"""
    await callback.answer()
    await state.update_data(role="student")
    groups = await get_groups(client_session)
    if groups:
        groups_dict = [g.model_dump(exclude_unset=True) for g in groups]
        await state.update_data(groups=groups_dict)
        await callback.message.edit_text(
            text="🎓 *Excellent choice!*\n\n"
            "📚 *Now, please select your study group:*\n\n"
            "👉 Use the buttons below to browse and find your group.",
            parse_mode="Markdown",
            reply_markup=get_groups_keyboard(groups_dict),
        )
        await state.set_state(RegistrationStates.student_group)
    else:
        callback.message.edit_text(
            text="😕 *Oops! Service Temporarily Unavailable*\n\n"
            "The server is not responding at the moment.\n\n"
            "🔧 *Please try again in a few minutes.",
            parse_mode="Markdown",
        )
        await state.clear()


@router.callback_query(
    StateFilter(RegistrationStates.student_group), F.data.startswith("groups_page:")
)
async def process_groups_page(callback: CallbackQuery, state: FSMContext):
    page = int(callback.data.split(":")[1])
    state_data = await state.get_data()
    groups = state_data.get("groups", [])

    keyboard = get_groups_keyboard(groups, page)
    await callback.message.edit_reply_markup(reply_markup=keyboard)
    await callback.answer()


@router.callback_query(
    StateFilter(RegistrationStates.student_group), F.data.startswith("select_group:")
)
async def process_student_group(callback: CallbackQuery, state: FSMContext):
    """Student selects their group"""
    group_id = callback.data.split(":")[1]
    state_data = await state.get_data()
    groups = state_data.get("groups", [])
    await state.update_data(group_id=group_id)
    role = state_data.get("role")
    selected_group = next((g for g in groups if str(g["id"]) == group_id), None)

    if selected_group:
        await callback.message.edit_text(
            text="✅ *Perfect! Let's review your selection*\n\n"
            "📋 *Registration Summary:*\n"
            f"   👤 **Role:** {role}\n"
            f"   🎓 **Group:** {selected_group['name']}\n"
            f"   📅 **Course:** {selected_group['course']}\n"
            f"   🏛️ **Institute:** {selected_group['institute']}\n\n"
            "👉 *Please confirm if all information is correct:*",
            parse_mode="Markdown",
            reply_markup=get_confirmation_keyboard(),
        )
        await state.set_state(RegistrationStates.confirm_data)
    else:
        await callback.message.edit_text(
            text="❌ *Group Not Found*\n\n"
            "The selected group could not be found.\n\n"
            "🔄 *Please try selecting again",
            parse_mode="Markdown",
        )


@router.callback_query(StateFilter(RegistrationStates.choose_role), F.data == "role_teacher")
async def process_teacher_role(
    callback: CallbackQuery, client_session: ClientSession, state: FSMContext
):
    """User selects teacher role"""
    await state.update_data(role="teacher")
    teachers = await get_teachers(client_session)
    if teachers:
        teachers_dict = [t.model_dump(exclude_unset=True) for t in teachers]
        await state.update_data(teachers=teachers_dict)
        await callback.message.edit_text(
            text="👨‍🏫 *Welcome, Professor!*\n\n"
            "📝 *Please select your name from the faculty list:*\n\n"
            "🔍 Use the buttons below to find yourself.",
            parse_mode="Markdown",
            reply_markup=get_teachers_keyboard(teachers_dict),
        )
        await state.set_state(RegistrationStates.teacher_select)
    else:
        callback.message.edit_text(
            text="😕 *Service Unavailable*\n\n"
            "Unable to retrieve faculty list at the moment.\n\n"
            "⏳ *Please try again shortly.*\n",
            parse_mode="Markdown",
        )
        await state.clear()


@router.callback_query(
    StateFilter(RegistrationStates.teacher_select), F.data.startswith("teachers_page:")
)
async def process_teachers_pages(callback: CallbackQuery, state: FSMContext):
    """Pagination for teachers list"""
    page = int(callback.data.split(":")[1])
    state_data = await state.get_data()
    teachers = state_data.get("teachers", [])

    await callback.message.edit_reply_markup(reply_markup=get_teachers_keyboard(teachers, page))
    await callback.answer()


@router.callback_query(
    StateFilter(RegistrationStates.teacher_select), F.data.startswith("select_teacher:")
)
async def process_teacher_name(callback: CallbackQuery, state: FSMContext):
    """Teacher selects their name"""
    teacher_id = callback.data.split(":")[1]
    await state.update_data(teacher_id=teacher_id)
    state_data = await state.get_data()
    role = state_data.get("role")
    teachers = state_data.get("teachers", [])
    selected_teacher = next((t for t in teachers if str(t["id"]) == teacher_id), None)
    if selected_teacher:
        await callback.message.edit_text(
            text="✅ *Excellent! Let's review your details*\n\n"
            "📋 *Registration Summary:*\n"
            f"   👤 **Role:** {role}\n"
            f"   👨‍🏫 **Name:** {get_teacher_fullname(selected_teacher)}\n"
            f"   🏢 **Department:** {selected_teacher['department']}\n\n"
            "👉 *Please confirm if all information is correct:*",
            parse_mode="Markdown",
            reply_markup=get_confirmation_keyboard(),
        )
        await state.set_state(RegistrationStates.confirm_data)
    else:
        await callback.message.edit_text(
            text="❌ *Teacher Not Found*\n\n"
            "The selected faculty member could not be found.\n\n"
            "🔄 *Please try selecting again",
            parse_mode="Markdown",
        )
        await state.clear()


@router.callback_query(StateFilter(RegistrationStates.confirm_data), F.data == "confirm")
async def process_confirm(callback: CallbackQuery, db_session: Session, state: FSMContext):
    """Final confirmation and user registration"""
    state_data = await state.get_data()
    role = state_data["role"]
    group_id = state_data.get("group_id", None)
    teacher_id = state_data.get("teacher_id", None)
    user = User(
        telegram_id=callback.from_user.id,
        username=callback.from_user.username,
        role=role,
        group_id=group_id,
        teacher_id=teacher_id,
        subscribed=True,
    )
    try:
        create_user(db_session, user)
        await callback.answer(
            text="🎉 *Registration Complete!*\n\n✨ Welcome to USFEU Schedule System!",
        )
        logger.info(f"User with {user.telegram_id} tg_id successfully created.")
    except Exception as e:
        await callback.answer(
            "😕 Oups, it seems something go wrong.\nPlease, try later.", show_alert=True
        )
        logger.error(f"Error while creating user in DB: {str(e)}")
        await callback.message.edit_text(
            text="😕 *Registration Issue*\n\n"
            "We encountered a problem while saving your information.\n\n"
            "🔄 *Please try the registration process again.*\n"
            "If the problem continues, contact: @hororlib",
            parse_mode="Markdown",
        )
    finally:
        await state.clear()


@router.callback_query(StateFilter(RegistrationStates.confirm_data), F.data == "cancel")
async def process_cancel(callback: CallbackQuery, state: FSMContext):
    """Cancel registration process"""
    await state.clear()
    await callback.answer(text="🔄 Registration cancelled")

    await callback.message.edit_text(
        text="🔄 *Registration Cancelled*\n\n"
        "You have cancelled the registration process.\n\n"
        "👉 *To start over, use:* /register\n"
        "❓ *For help, use:* /help\n\n"
        "We hope to see you again soon!",
        parse_mode="Markdown",
    )


@router.callback_query(StateFilter(RegistrationStates.confirm_data), F.data == "back_to_selection")
async def back_to_selection(callback: CallbackQuery, state: FSMContext):
    """Return to role selection from confirmation"""
    await state.set_state(RegistrationStates.choose_role)

    await callback.message.edit_text(
        text="🔄 *Returning to Role Selection*\n\nPlease select your role again:",
        parse_mode="Markdown",
        reply_markup=get_role_keyboard(),
    )
    await callback.answer()
