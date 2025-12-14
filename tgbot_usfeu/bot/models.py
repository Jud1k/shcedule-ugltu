from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    telegram_id: int = Field(unique=True)
    username: str | None = None
    role: str | None = None
    group_id: int | None = None
    teacher_id: int | None = None
    subscribed: bool = Field(default=False)


class Groups(SQLModel):
    id: int = Field(default=None, primary_key=True)
    name: str = Field(unique=True)
    course: int
    institute: str


class Teachers(SQLModel):
    id: int = Field(default=None, primary_key=True)
    first_name: str
    middle_name: str | None = None
    last_name: str
    email: str | None = Field(unique=True, nullable=True)
    phone: str = Field(unique=True, nullable=True)
    department: str
    title: str
