export const BASE_URL_GALAXY = 'https://norma.nomoreparties.space/api/'
export const WS_URL_All = 'wss://norma.nomoreparties.space/orders/all'
export const WS_URL_USER = 'wss://norma.nomoreparties.space/orders'

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
    FOGOT_PASSWORD: '/fogot-password',
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
