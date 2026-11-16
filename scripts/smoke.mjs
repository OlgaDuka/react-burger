/**
 * Проверка живого API: логин, заказ, чтение заказа, обновление токена, WebSocket.
 * Требует запущенных `npm run db` и `npm run api`.
 *
 *   node scripts/smoke.mjs
 */
import WebSocket from 'ws'

const API = (process.env.SMOKE_API_URL ?? 'http://localhost:3001').replace(/\/+$/, '')
const WS = API.replace(/^http/, 'ws')
const EMAIL = process.env.SMOKE_EMAIL ?? 'leliduk@yandex.ru'
const PASSWORD = process.env.SMOKE_PASSWORD ?? 'burger123'

let failures = 0

const check = (name, condition, details = '') => {
  if (condition) {
    console.log(`  ok   ${name}`)
  } else {
    failures += 1
    console.error(`  FAIL ${name}${details ? ` — ${details}` : ''}`)
  }
}

async function call(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  const body = await response.json().catch(() => null)

  return { status: response.status, body }
}

async function checkWebSocket(url, label) {
  return new Promise((resolve) => {
    const socket = new WebSocket(url)
    const timer = setTimeout(() => {
      socket.terminate()
      check(label, false, 'нет сообщения за 5 секунд')
      resolve()
    }, 5000)

    socket.on('message', (data) => {
      clearTimeout(timer)
      const payload = JSON.parse(data.toString())
      check(label, Array.isArray(payload.orders), JSON.stringify(payload).slice(0, 120))
      socket.close()
      resolve()
    })

    socket.on('error', (error) => {
      clearTimeout(timer)
      check(label, false, error.message)
      resolve()
    })
  })
}

const main = async () => {
  console.log(`API: ${API}`)

  const health = await call('/api/health')
  check('GET /api/health', health.status === 200 && health.body?.success === true)

  const ingredients = await call('/api/ingredients')
  check(
    'GET /api/ingredients',
    ingredients.status === 200 && ingredients.body?.data?.length > 0,
    `получено ${ingredients.body?.data?.length}`
  )

  const bun = ingredients.body.data.find((item) => item.type === 'bun')
  const main = ingredients.body.data.find((item) => item.type === 'main')

  const login = await call('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  const accessToken = login.body?.accessToken?.replace('Bearer ', '')
  check('POST /api/auth/login', login.status === 200 && Boolean(accessToken))

  const badLogin = await call('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: 'wrong-password' }),
  })
  check('неверный пароль → 401', badLogin.status === 401)

  const profile = await call('/api/auth/user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  check('GET /api/auth/user', profile.status === 200 && profile.body?.user?.email === EMAIL)

  const created = await call('/api/orders', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ ingredients: [bun._id, main._id, bun._id] }),
  })
  const order = created.body?.order
  check(
    'POST /api/orders',
    created.status === 200 && Boolean(order?.number) && order?.ingredients?.length === 3,
    JSON.stringify(created.body).slice(0, 160)
  )

  if (order) {
    const byNumber = await call(`/api/orders/${order.number}`)
    check('GET /api/orders/:number', byNumber.status === 200 && byNumber.body?.orders?.[0]?._id === order._id)
  }

  const refreshed = await call('/api/auth/token', {
    method: 'POST',
    body: JSON.stringify({ token: login.body.refreshToken }),
  })
  check('POST /api/auth/token', refreshed.status === 200 && Boolean(refreshed.body?.accessToken))

  const reused = await call('/api/auth/token', {
    method: 'POST',
    body: JSON.stringify({ token: login.body.refreshToken }),
  })
  check('повторное использование refresh запрещено', reused.status === 401)

  await checkWebSocket(`${WS}/orders/all`, 'WS /orders/all отдаёт ленту')
  await checkWebSocket(`${WS}/orders?token=${accessToken}`, 'WS /orders отдаёт заказы пользователя')

  console.log(failures === 0 ? '\nВсе проверки пройдены.' : `\nПровалено проверок: ${failures}`)
  process.exitCode = failures === 0 ? 0 : 1
}

main().catch((error) => {
  console.error('Смоук-тест упал:', error)
  process.exitCode = 1
})
