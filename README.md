# 🎓 Расписание УГЛТУ
Веб-приложение для просмотра расписания занятий Уральского государственного лесотехнического университета.

https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi
https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white


# 🏗️ Архитектура
Проект разделен на два основных компонента:

## Backend
FastAPI

SQLAlchemy

PostgreSQL

Redis 

# Frontend
React

TypeScript

React Query

Tailwind CSS

Axios

# 📁 Структура проекта
```
.
├── backend
│   ├── app
│   │   ├── cache
│   │   ├── core
│   │   │   └── deps
│   │   ├── db
│   │   ├── domain
│   │   │   ├── auth
│   │   │   ├── building
│   │   │   ├── group
│   │   │   ├── lesson
│   │   │   ├── room
│   │   │   ├── student
│   │   │   ├── subject
│   │   │   └── teacher
│   │   └── migration
│   │       └── versions
│   ├── scripts
│   └── tests
│       ├── auth
│       ├── building
│       ├── group
│       ├── lesson
│       ├── room
│       ├── student
│       ├── subject
│       └── teacher
└── frontend
    ├── public
    └── src
        ├── api
        ├── app
        ├── components
        │   ├── admin
        │   ├── generic
        │   └── layouts
        ├── context
        ├── features
        │   ├── auth
        │   │   ├── api
        │   │   └── components
        │   ├── group
        │   │   ├── api
        │   │   ├── components
        │   │   └── types
        │   ├── lesson
        │   │   ├── api
        │   │   ├── components
        │   │   ├── types
        │   │   └── utils
        │   ├── room
        │   │   ├── api
        │   │   └── components
        │   ├── subject
        │   │   ├── api
        │   │   └── components
        │   └── teacher
        │       ├── api
        │       ├── components
        │       └── types
        ├── hooks
        ├── lib
        ├── pages
        │   ├── admin
        │   ├── auth
        │   └── schedule
        └── types
```

# 🚀 Быстрый старт
## Клонирование репозитория

```bash
git clone https://github.com/yourusername/ugltu-schedule.git
cd ugltu-schedule
```

## Настройка переменных окружения
```
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=ugltu_schedule
REDIS_URL=redis://localhost:6379
SECRET_KEY=your_secret_key
```

## Установка зависимостей через uv
```bash
uv sync
```

## Применение миграций
```bash
uv run alembic upgrade head
```

## 🐳 Сборка и запуск всех сервисов
```bash
docker-compose up -d --build
```

## 🧪 Тестирование
```bash
cd backend
pytest
```