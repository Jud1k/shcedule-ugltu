# 🎓 Расписание УГЛТУ
Веб-приложение для просмотра расписания занятий Уральского государственного лесотехнического университета.

## 🏗️ Технологический стек
- ⚡ FastAPI – высокопроизводительный Python-фреймворк для создания API
    - 📊 SQLALchemy – современный ORM для взаимодействия с базами данных SQL
    - ✅ Pydantic – валидация данных и управление настройками
    - 🐘 PostgreSQL – мощная реляционная база данных для хранения основной информации
    - 🟥 Redis – система кэширования и управления сессиями для повышения производительности
- ⚛️ React – библиотека для построения интерактивного пользовательского интерфейса
    - 🎨 DaisyUI – компоненты на основе Tailwind CSS для современного дизайна
    - 📝 React Query - управление состоянием и кэширование
    - 📅 Tailwind CSS - утилитарные стили
    - 📩 Axios - HTTP-клиент для взаимодействия с API
- 🔒 JWT-аутентификация – безопасная аутентификация с использованием JSON Web Tokens
- 🐳 Docker Compose – контейнеризация для разработки и продакшена
- 🧪 Тестирование с Pytest – комплексное тестирование кодовой базы

## 📁 Структура проекта
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

## 🚀 Быстрый старт
### Клонирование репозитория

```bash
git clone https://github.com/yourusername/ugltu-schedule.git
cd ugltu-schedule
```

### Настройка переменных окружения
```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=username
   DB_PASSWORD=password
   DB_NAME=your_db_name
   REDIS_PORT=6379
   REDIS_SSL=0
   REDIS_HOST=localhost
   SECRET_KEY=your_secret_key
   ALGORITHM=HS256
   FIRST_SUPERUSER=your_superuser_email
   FIRST_SUPERUSER_PASSWORD=your_superuser_password
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   REFRESH_TOKEN_EXPIRE_MINUTES=43200
   SENTRY_DSN=...
```

### Установка зависимостей через uv
```bash
uv sync
```

### Применение миграций
```bash
uv run alembic upgrade head
```

### Сборка и запуск всех сервисов
```bash
docker-compose up -d --build
```

### Тестирование
```bash
cd backend
pytest
```
