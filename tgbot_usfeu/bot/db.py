from sqlmodel import Session, create_engine, select
from sqlalchemy import text
from bot.config import settings
from bot.models import User

engine = create_engine(str(settings.DATABASE_URL), echo=True)


def init_db() -> None:
    # SQLModel.metadata.drop_all(engine)
    # SQLModel.metadata.create_all(engine)
    session = Session(engine)
    delete_all_users(session)


def delete_all_users(session: Session) -> None:
    query = text("DELETE FROM user WHERE id>0")
    session.exec(query)
    session.commit()


def find_user(session: Session, tg_id: str) -> User | None:
    query = select(User).filter(User.telegram_id == tg_id)
    result = session.exec(query).first()
    return result


def create_user(session: Session, user: User) -> User:
    session.add(user)
    session.commit()
    return user


def update_user(session: Session, user: User) -> User:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def delete_user(session: Session, user: User) -> None:
    session.delete(user)
    session.commit()
