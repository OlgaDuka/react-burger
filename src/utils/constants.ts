// Адрес API можно переопределить переменными окружения Vite (файл .env в корне):
//   VITE_API_URL=http://localhost:3001 — локальный сервер из `server/`
//   VITE_API_URL=https://norma.education-services.ru — учебный API
const API_ORIGIN = (import.meta.env.VITE_API_URL || 'https://norma.education-services.ru').replace(
  /\/+$/,
  ''
)

const WS_ORIGIN = (import.meta.env.VITE_WS_URL || API_ORIGIN.replace(/^http/, 'ws')).replace(
  /\/+$/,
  ''
)

export const BASE_URL_GALAXY = `${API_ORIGIN}/api/`
export const WS_URL_All = `${WS_ORIGIN}/orders/all`
export const WS_URL_USER = `${WS_ORIGIN}/orders`
export const RECONNECT_TIME = 3000

export const ENDPOINT = {
    INGREDIENTS: 'ingredients',
    ORDERS: 'orders',
    PASSWORD_RESET: 'password-reset',
    PASSWORD_RESET_RESET: 'password-reset/reset',
    REGISTER: 'auth/register',
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    UPDATE_TOKEN: 'auth/token',
    USER: 'auth/user'
}

export const ROUTES = {
    HOME: '/',
    FORGOT_PASSWORD: '/forgot-password',
    LOGIN: '/login',
    REGISTER: '/register',
    RESET_PASSWORD: '/reset-password'
}

export const INGREDIENT_TYPES = ['Булки', 'Соусы', 'Начинки']

export const INGREDIENT_PROPS = {
    'calories': 'Калории, ккал',
    'proteins': 'Белки, г',
    'fat': 'Жиры, г',
    'carbohydrates': 'Углеводы, г'
}

export const STORAGE_KEY = {
    ACCESS: 'accessToken',
    REFRESH: 'refreshToken',
    RESET_PASSWORD: 'resetPassword'
}

export const ORDER_STATUS =  {
    CREATED: 'created',
    PENDING: 'pending',
    DONE: 'done'
}

export const STATUS_TEXT =  {
    'created': 'Создан',
    'pending': 'Готовится',
    'done': 'Выполнен'
}
