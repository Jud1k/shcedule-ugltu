from pydantic import BaseModel


class Group(BaseModel):
    id: int
    name: str
    course: int
    institute: str


class Teacher(BaseModel):
    id: int
    first_name: str
    middle_name: str | None
    last_name: str
    email: str | None
    phone: str | None
    department: str
    title: str
