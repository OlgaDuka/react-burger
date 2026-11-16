-- Схема базы данных «Stellar Burger».
-- Скрипт идемпотентен: его можно применять повторно на существующей базе.

do $$
begin
  create type order_status as enum ('created', 'pending', 'done');
exception
  when duplicate_object then null;
end
$$;

create table if not exists ingredients (
  id            char(24) primary key,
  name          text        not null,
  type          text        not null check (type in ('bun', 'main', 'sauce')),
  proteins      integer     not null default 0 check (proteins >= 0),
  fat           integer     not null default 0 check (fat >= 0),
  carbohydrates integer     not null default 0 check (carbohydrates >= 0),
  calories      integer     not null default 0 check (calories >= 0),
  price         integer     not null check (price >= 0),
  image         text        not null,
  image_mobile  text,
  image_large   text,
  created_at    timestamptz not null default now()
);

create table if not exists users (
  id            char(24) primary key,
  email         text        not null,
  name          text        not null,
  password_hash text        not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create unique index if not exists users_email_unique on users (lower(email));

create table if not exists refresh_tokens (
  id         bigserial primary key,
  user_id    char(24)    not null references users (id) on delete cascade,
  token_hash text        not null unique,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists refresh_tokens_user_idx on refresh_tokens (user_id);

-- Номера заказов начинаются с «красивого» значения, как в учебном API.
create sequence if not exists order_number_seq start with 68400;

create table if not exists orders (
  id          char(24)     primary key,
  number      integer      not null unique default nextval('order_number_seq'),
  user_id     char(24)     references users (id) on delete set null,
  name        text         not null,
  status      order_status not null default 'created',
  total_price integer      not null default 0 check (total_price >= 0),
  created_at  timestamptz  not null default now(),
  updated_at  timestamptz  not null default now()
);

create index if not exists orders_user_idx on orders (user_id, created_at desc);
create index if not exists orders_created_idx on orders (created_at desc);

-- Состав заказа хранится отдельными строками: позиция задаёт порядок ингредиентов,
-- поэтому повторяющиеся ингредиенты (например, две булки) не теряются.
create table if not exists order_ingredients (
  order_id      char(24) not null references orders (id) on delete cascade,
  ingredient_id char(24) not null references ingredients (id) on delete restrict,
  position      integer  not null check (position >= 0),
  primary key (order_id, position)
);

create index if not exists order_ingredients_ingredient_idx on order_ingredients (ingredient_id);

create table if not exists password_reset_codes (
  id         bigserial primary key,
  user_id    char(24)    not null references users (id) on delete cascade,
  code_hash  text        not null,
  expires_at timestamptz not null,
  used_at    timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists password_reset_codes_user_idx on password_reset_codes (user_id);
