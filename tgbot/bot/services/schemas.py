from pydantic import BaseModel


class UserBase(BaseModel):
    telegram_id: int | None = None
    username: str | None = None
    role: str | None = None
    group_id: int | None = None
    teacher_id: int | None = None
    subscribed: bool | None = None


class UserRead(UserBase):
    id: int | None = None


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    pass


class Group(BaseModel):
    id: int | None = None
    name: str
    course: int
    institute: str


class Teacher(BaseModel):
    id: int | None = None
    first_name: str
    middle_name: str | None = None
    last_name: str
    email: str | None
    phone: str | None
    department: str
    title: str


class Subject(BaseModel):
    id: int
    name: str
    semester: int
    total_hours: int
    is_optional: bool


class Room(BaseModel):
    id: int
    name: str
    floor: int
    capacity: int
    status: int


class Lesson(BaseModel):
    id: int
    type: str
    day_of_week: int
    time_id: int
    subject: Subject
    room: Room
    teacher: Teacher
    group: Group


class LessonUpdateEvent(BaseModel):
    pass
