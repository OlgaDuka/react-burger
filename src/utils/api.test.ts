import { vi } from 'vitest'
import { requestWithUpdateToken } from './api'

/**
 * Регрессия: раньше ошибка сервера возвращалась из requestWithUpdateToken как
 * обычный результат, thunk завершался успешно с undefined, и в state.order
 * попадал undefined — из-за этого падал OrderDetails.
 */
describe('requestWithUpdateToken', () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch
  })

  const mockFetch = (response: { ok: boolean; body: unknown }): void => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: response.ok,
      json: async () => response.body,
    }) as unknown as typeof fetch
  }

  it('возвращает данные при успешном ответе', async () => {
    mockFetch({ ok: true, body: { success: true, order: { number: 68400 } } })

    await expect(requestWithUpdateToken('orders')).resolves.toEqual({
      success: true,
      order: { number: 68400 },
    })
  })

  it('пробрасывает ошибку сервера, а не возвращает её как результат', async () => {
    mockFetch({ ok: false, body: { success: false, message: 'Internal Server Error' } })

    await expect(requestWithUpdateToken('orders')).rejects.toBeDefined()
  })
})
