import {BASE_URL_GALAXY, ENDPOINT, STORAGE_KEY} from './constants'
import {
  IIngredientItem,
  TErrorResponse,
  TForm,
  TLoginUser,
  TOrderItem,
  TProfileUser,
  TResetPassword,
  TSendEmail
} from './types'

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return await res.json()
  }
  return await res.json().then((error: TErrorResponse) => Promise.reject(`Ошибка: ${error.message}`))
}

export const request = async (endpoint: string, options?: object) => {
  const url: string = `${BASE_URL_GALAXY}${endpoint}`

  return await fetch(url, options).then(checkResponse)
}

export const updateToken = async () => await request(ENDPOINT.UPDATE_TOKEN, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ 'token': localStorage.getItem(STORAGE_KEY.REFRESH) })
}).then((res) => {
  const refreshData = res.accessToken.split('Bearer ')[1]
  localStorage.setItem(STORAGE_KEY.ACCESS, refreshData)
  localStorage.setItem(STORAGE_KEY.REFRESH, res.refreshToken)
  return refreshData
})

export const requestWithUpdateToken = async (endpoint: string, options?: RequestInit) => {
  try {
    return await request(endpoint, options)
  } catch (error) {
    if (!String(error).includes("jwt expired")) {
      return error
    }
    await updateToken()

    return request(endpoint, {
      ...options,
      headers: {
        ...options?.headers,
        'Authorization': localStorage.getItem(STORAGE_KEY.ACCESS) || ''
      }
    })
  }
}

export const getIngredientsRequest = (): Promise<IIngredientItem[]> => request(ENDPOINT.INGREDIENTS)
  .then((res) => res.data.map((item: IIngredientItem) => { return { ...item, count: 0 }}))

export const getOrderRequest = (id: string): Promise<TOrderItem> => request(`${ENDPOINT.ORDERS}/${id}`)
  .then((res) => res.orders[0])

export const sendOrderRequest = (ingredients: string[]) => requestWithUpdateToken(ENDPOINT.ORDERS, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_KEY.ACCESS)
  },
  body: JSON.stringify({ ingredients })
}).then((res => res.order))

export const sendEmail = (data: TForm<TSendEmail>) => request(ENDPOINT.PASSWORD_RESET, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ 'email': data.email })
}).then(res => res.message)

export const resetPassword = (data: TForm<TResetPassword>) => request(ENDPOINT.PASSWORD_RESET_RESET, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ 'password': data.password, 'token': data.token })
}).then(res => res.message)

export const registerUserRequest = (data: TForm<TProfileUser>) => request(ENDPOINT.REGISTER, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({
    'email': data.email,
    'password': data.password,
    'name': data.name
  })
}).then((res) => {
  localStorage.setItem(STORAGE_KEY.ACCESS, res.accessToken.split('Bearer ')[1])
  localStorage.setItem(STORAGE_KEY.REFRESH, res.refreshToken)
  return res.user
}).catch(error => { throw error })

export const loginUserRequest = (data: TForm<TLoginUser>) => request(ENDPOINT.LOGIN, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({
    'email': data.email,
    'password': data.password
  })
}).then((res) => {
  localStorage.setItem(STORAGE_KEY.ACCESS, res.accessToken.split('Bearer ')[1])
  localStorage.setItem(STORAGE_KEY.REFRESH, res.refreshToken)
  return res.user
}).catch(error => { throw error })

export const logoutUserRequest = () => request(ENDPOINT.LOGOUT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ 'token': localStorage.getItem(STORAGE_KEY.REFRESH) })
}).then(res => {
  localStorage.removeItem(STORAGE_KEY.ACCESS)
  return res.message
})

export const getUserRequest = () => requestWithUpdateToken(ENDPOINT.USER, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_KEY.ACCESS)
  }
})
export const updateUserRequest = (data: TForm<TProfileUser>) => requestWithUpdateToken(ENDPOINT.USER, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_KEY.ACCESS)
  },
  body: JSON.stringify(data)
})
