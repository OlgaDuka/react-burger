# Проектная работа Stellar-Burger

#### (космическая бургерная)

Данный проект является частью образовательной программы "React developer" на платформе Яндекс.Практикум

## Project preview

[Project link](https://seagull.students.nomorepartiesco.ru/) <br>
[Project link on GitHub](https://olgaduka.github.io/react-burger/)

## В проекте использованы технологии

React, Typescript, ReduxToolkit, ReactDND, React-Router-Dom, WebsocketAPI, Vite, Vitest

Собственный бэкенд: Node.js, Express, PostgreSQL, WebSocket (`ws`).

---

## Быстрый старт

```bash
npm install
npm run dev
```

Команда поднимает три процесса:

| Процесс | Адрес | Что делает |
| --- | --- | --- |
| `db` | `localhost:5433` | локальный PostgreSQL, данные в `.pgdata` |
| `api` | `http://localhost:3001/api` | REST + WebSocket, сам применяет схему и заливает данные |
| `web` | `http://localhost:3000` | React-приложение (Vite) |

При первом запуске создаётся кластер PostgreSQL, схема и демонстрационные данные —
ничего настраивать руками не нужно. Docker и права администратора не требуются:
PostgreSQL запускается из npm-пакета `embedded-postgres`.

**Демо-вход:** `leliduk@yandex.ru` / `burger123` (второй пользователь — `tester@burger.dev` / `burger123`).

### Отдельные команды

```bash
npm run db          # только PostgreSQL (долгоиграющий процесс)
npm run api         # только API с автоперезагрузкой
npm start           # только фронтенд (Vite, API должен быть уже запущен)
```

## Скрипты

| Скрипт | Назначение |
| --- | --- |
| `npm run dev` | БД + API + фронтенд одной командой |
| `npm start` | dev-сервер Vite на `localhost:3000` |
| `npm run build` | проверка типов + прод-сборка в `dist/` |
| `npm run preview` | локальный предпросмотр собранного `dist/` |
| `npm test` | unit-тесты (Vitest, однократный прогон) |
| `npm run test:watch` | unit-тесты в режиме наблюдения |
| `npm run db` | локальный PostgreSQL |
| `npm run api` | API-сервер с `tsx watch` |
| `npm run api:start` | API-сервер без перезапуска |
| `npm run db:migrate` | применить `server/db/schema.sql` |
| `npm run db:seed` | заполнить пустую базу справочником и демо-данными |
| `npm run db:reset` | очистить базу и заполнить заново |
| `npm run db:stats` | количество строк в таблицах |
| `npm run typecheck:server` | проверка типов серверного кода |
| `node scripts/smoke.mjs` | сквозная проверка живого API (REST + WebSocket) |

## База данных

Схема описана в [`server/db/schema.sql`](server/db/schema.sql) и применяется
автоматически при старте API (скрипт идемпотентен).

| Таблица | Что хранит |
| --- | --- |
| `ingredients` | справочник ингредиентов (15 позиций, данные учебного API) |
| `users` | пользователи, пароли в виде scrypt-хеша |
| `refresh_tokens` | выданные refresh-токены (хранятся хеши, ротация при обновлении) |
| `orders` | заказы: номер, имя, статус, сумма, автор |
| `order_ingredients` | состав заказа с порядком ингредиентов (две булки не схлопываются) |
| `password_reset_codes` | одноразовые коды восстановления пароля |

Особенности:

- номера заказов начинаются с `68400` (последовательность `order_number_seq`);
- `orders.number` отдаётся фронтенду как `number`, `_id` — 24-символьный id в стиле Mongo,
  чтобы ответы не отличались от учебного сервиса;
- имя заказа собирается из названий ингредиентов («Краторный биокотлета бургер»);
- при первом запуске создаётся 16 заказов за последние две недели, чтобы лента
  и профиль были наполнены.

Посмотреть данные: `npm run db:stats`. Полный сброс: `npm run db:reset`.

## API

Все ответы повторяют контракт учебного API (`{ success, data }`, `{ success, order }` и т.д.),
поэтому фронтенд работает без изменений в коде запросов.

| Метод | Путь | Описание |
| --- | --- | --- |
| `GET` | `/api/health` | проверка API и подключения к БД |
| `GET` | `/api/ingredients` | список ингредиентов |
| `GET` | `/api/ingredients/:id` | один ингредиент |
| `POST` | `/api/orders` | создать заказ (нужен access-токен) |
| `GET` | `/api/orders` | последние заказы |
| `GET` | `/api/orders/:id` | заказ по `_id` **или** номеру |
| `POST` | `/api/auth/register` | регистрация |
| `POST` | `/api/auth/login` | вход |
| `POST` | `/api/auth/logout` | выход (отзывает refresh-токен) |
| `POST` | `/api/auth/token` | обновление пары токенов |
| `GET` | `/api/auth/user` | текущий пользователь |
| `PATCH` | `/api/auth/user` | изменить профиль |
| `POST` | `/api/password-reset` | запросить код восстановления |
| `POST` | `/api/password-reset/reset` | сменить пароль по коду |
| `WS` | `/orders/all` | лента всех заказов |
| `WS` | `/orders?token=<access>` | заказы пользователя |

Письма не отправляются: код восстановления печатается в консоль API-сервера.

## Документация API (OpenAPI)

Контракт всех ручек описан в [`server/openapi.yaml`](server/openapi.yaml) — OpenAPI 3.0.3.
Сервер отдаёт его двумя способами, пока запущен `npm run api`:

| Адрес | Что это |
| --- | --- |
| `http://localhost:3001/api/docs` | Swagger UI: интерактивный справочник с примерами и кнопкой Authorize |
| `http://localhost:3001/api/openapi.yaml` | исходная спецификация для Swagger Editor, Postman или генерации клиента |

Проверить файл после правок:

```bash
npx @apidevtools/swagger-cli validate server/openapi.yaml
```

WebSocket-каналы в OpenAPI не описываются: они перечислены в `info.description`
и описаны схемой `WsOrdersMessage`. Спецификация читается на каждый запрос,
поэтому изменения видны в браузере после обновления страницы, без перезапуска сервера.

## Переменные окружения

Все настройки лежат в [`.env`](.env) в корне проекта. Vite отдаёт в браузер только
переменные с префиксом `VITE_`, остальные читает серверная часть.

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| `PG_PORT` | `5433` | порт локального PostgreSQL |
| `PG_USER` / `PG_PASSWORD` | `postgres` / `postgres` | учётные данные кластера |
| `PG_DATABASE` | `react_burger` | имя базы |
| `DATABASE_URL` | `postgres://postgres:postgres@localhost:5433/react_burger` | строка подключения API |
| `API_PORT` | `3001` | порт API (не `PORT`: его перехватывает dev-сервер Vite) |
| `JWT_SECRET` | dev-значение | подпись токенов, **сменить на сервере** |
| `JWT_ACCESS_TTL` | `20m` | время жизни access-токена |
| `JWT_REFRESH_TTL_DAYS` | `30` | время жизни refresh-токена |
| `CORS_ORIGIN` | `http://localhost:3000` | разрешённые источники (через запятую) |
| `SEED_DEMO_DATA` | `true` | создавать демо-пользователей и заказы |
| `VITE_API_URL` | `http://localhost:3001` | адрес API для фронтенда |
| `VITE_WS_URL` | вычисляется из `VITE_API_URL` | адрес WebSocket |

## Как вернуться на учебный API

Фронтенд по-прежнему умеет работать с `norma.education-services.ru`:

```bash
VITE_API_URL=https://norma.education-services.ru npm start
```

На Windows PowerShell:

```powershell
$env:VITE_API_URL="https://norma.education-services.ru"; npm start
```

## Структура

```
index.html            точка входа Vite (шаблон + <script type="module">)
vite.config.mts       dev-сервер, сборка в dist/, настройки Vitest
src/
  index.tsx           монтирование React
  setupTests.ts       подключение jest-dom к expect из Vitest
server/
  index.ts            запуск: БД → схема → сид → HTTP + WebSocket
  app.ts              сборка Express-приложения
  config.ts           чтение .env
  docs.ts             Swagger UI и отдача openapi.yaml
  openapi.yaml        контракт всех ручек (OpenAPI 3.0.3)
  ws.ts               /orders/all и /orders?token=
  db/
    schema.sql        DDL
    bootstrap.ts      ensureSchema / seedIfEmpty / resetDatabase
    seed/             ingredients.json и генератор демо-заказов
  repositories/       SQL-запросы (ингредиенты, пользователи, заказы)
  routes/             REST-обработчики
  services/tokens.ts  выдача и ротация refresh-токенов
  cli/db.ts           migrate / seed / reset / stats
scripts/
  db.mjs              запуск локального PostgreSQL
  smoke.mjs           сквозная проверка API
```

## Если что-то не запускается

- **Порт 5433 занят** — поменяйте `PG_PORT` и `DATABASE_URL` в `.env` на свободный порт.
- **Кластер не стартует после обновления пакетов** — удалите папку `.pgdata` и запустите
  `npm run dev` заново: база пересоздастся вместе с демо-данными.
- **Хочу зайти в базу напрямую** — отдельного `psql` в системе нет (PostgreSQL поднимается
  из npm-пакета). Быстрый просмотр данных: `npm run db:stats`; произвольный SQL можно
  выполнить через `npx tsx -e "..."` с `query` из `server/db/pool.ts`.
- **После `npm run db:reset` просит войти заново** — это нормально: у пользователей
  новые `id`, поэтому старый токен в браузере больше не действителен. Войдите заново.
- **После переезда на Vite страница белая** — удалите `node_modules` и `dist`,
  затем `npm install`: кэш и артефакты CRA больше не используются.

## Деплой

`Dockerfile-burger.pub` собирает только статику фронтенда в `dist/` и раздаёт её через
nginx — адрес API передаётся при сборке как build-arg:

```bash
docker build -f Dockerfile-burger.pub --build-arg VITE_API_URL=https://api.example.com .
```

API и PostgreSQL разворачиваются отдельно: серверу нужны `DATABASE_URL` и `JWT_SECRET`,
команда запуска — `npm run api:start` (исходники исполняет `tsx`), схема и данные
применяются при старте. Поэтому на сервере ставьте зависимости вместе с dev-частью:
`npm ci` без `--omit=dev`.
