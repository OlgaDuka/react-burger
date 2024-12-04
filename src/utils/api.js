import { BASE_URL_GALAXY, ENDPOINT } from './constants'

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`)
}

function request(endpoint, options) {
  const url = `${BASE_URL_GALAXY}${endpoint}`

  return fetch(url, options).then(checkResponse)
}
export const getIngredientsRequest = () => request(ENDPOINT.INGREDIENTS)

export const sendOrderRequest = async (ingredients) => await request(ENDPOINT.ORDER, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ ingredients })
})