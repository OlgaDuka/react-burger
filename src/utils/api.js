import { PATH_REQUESTS } from './constants'

const serverResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`)
}
export const getIngredientsRequest = () => fetch(PATH_REQUESTS.INGREDIENTS)
  .then(serverResponse)

export const sendOrderRequest = async (ingredients) => await fetch(PATH_REQUESTS.ORDER, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ ingredients })
}).then(serverResponse)