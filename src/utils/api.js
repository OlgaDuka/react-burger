import { BASE_URL_GALAXY, ENDPOINT } from './constants'

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return res.json().then((error) => Promise.reject(error))
}

function request(endpoint, options) {
  const url = `${BASE_URL_GALAXY}${endpoint}`

  return fetch(url, options).then(checkResponse)
}
export const getIngredientsRequest = () => request(ENDPOINT.INGREDIENTS)

export const sendOrderRequest = async (ingredients) => await request(ENDPOINT.ORDER, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: localStorage.getItem('accessToken')
  },
  body: JSON.stringify({ ingredients })
}).then(res => res.order)
  .catch(error => {
    if (error.message === 'jwt expired') {
      updateToken()
        .then(() => sendOrderRequest(ingredients))
        .catch(() => null)
    }
    throw error
  })

export const sendEmail = async (email) => await request(ENDPOINT.PASSWORD_RESET, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ 'email': email })
}).then(res => res.message)

export const resetPassword = async (password, token) => await request(ENDPOINT.PASSWORD_RESET_RESET, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ 'password': password, 'token': token })
}).then(res => res.message)

export const registerUser = async (user) => await request(ENDPOINT.REGISTER, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({
    'email': user.email,
    'password': user.password,
    'name': user.name
  })
}).then((res) => {
  localStorage.setItem('accessToken', res.accessToken)
  localStorage.setItem('refreshToken', res.refreshToken)
  return res.user
}).catch(error => { throw error })

export const loginUserRequest = async (user) => await request(ENDPOINT.LOGIN, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({
    'email': user.email,
    'password': user.password
  })
}).then((res) => {
  localStorage.setItem('accessToken', res.accessToken)
  localStorage.setItem('refreshToken', res.refreshToken)

  return res.user
})

export const logoutUserRequest = async () => await request(ENDPOINT.LOGOUT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ 'token': localStorage.getItem('refreshToken') })
}).then(res => {
  localStorage.removeItem('accessToken')

  return res.message
})

export const updateToken = async () => await request(ENDPOINT.UPDATE_TOKEN, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ 'token': localStorage.getItem('refreshToken') })
}).then((res) => {
  localStorage.setItem('accessToken', res.accessToken)
  localStorage.setItem('refreshToken', res.refreshToken)
}).catch(error => { throw error })

export const getUserRequest = async () => await request(ENDPOINT.USER, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: localStorage.getItem('accessToken')
  }
}).then(res => res.user)
  .catch(error => {
    if (error.message === 'jwt expired') {
      updateToken()
        .then(() => getUserRequest())
        .catch(() => null)
    }
    throw error
  })

export const updateUserRequest = async (user) => await request(ENDPOINT.USER, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: localStorage.getItem('accessToken')
  },
  body: JSON.stringify(user)
}).then(res => res.user)
  .catch(error => {
    if (error.message === 'jwt expired') {
      updateToken()
        .then(() => updateUserRequest(user))
        .catch(() => null)
    }
    throw error
  })
