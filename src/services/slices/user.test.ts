import reducer, {initialState} from './user'
import {getUser, loginUser, logoutUser, registerUser, updateUser} from '../thunks'

describe('userSlice', () => {
  it('получаем начальное состояние', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  it('получаем данные пользователя', () => {
    const payload = { user: {email: 'test@test.com', name: 'Test', password: '12345678' }}
    const action = getUser.fulfilled(payload, '')
    const state = reducer(initialState, action)

    expect(state).toEqual({
      user: { email: 'test@test.com', name: 'Test', password: '12345678' },
      success: true,
      isAuthChecked: true,
      loading: false,
      error: null
    })
  })

  it('обновляем данные пользователя', () => {
    const payload = { user: {email: 'test@test.com', name: 'Test', password: '12345678' }}
    const action = updateUser.fulfilled(payload, '', payload.user)
    const state = reducer(initialState, action)

    expect(state).toEqual({
      user: { email: 'test@test.com', name: 'Test', password: '12345678' },
      success: true,
      isAuthChecked: true,
      loading: false,
      error: null
    })
  })

  it('регистрация пользователя', () => {
    const payload = { email: 'test@test.com', name: 'Test', password: '12345678' }
    const action = registerUser.fulfilled(payload, '', payload)
    const state = reducer(initialState, action)

    expect(state).toEqual({
      user: { email: 'test@test.com', name: 'Test', password: '12345678' },
      success: true,
      isAuthChecked: false,
      loading: false,
      error: null
    })
  })

  it('вход пользователя в систему', () => {
    const payload = { email: 'test@test.com', name: 'Test', password: '12345678' }
    const action = loginUser.fulfilled(payload, '', payload)
    const state = reducer(initialState, action)

    expect(state).toEqual({
      user: { email: 'test@test.com', name: 'Test', password: '12345678' },
      success: true,
      isAuthChecked: true,
      loading: false,
      error: null
    })
  })

  it('выход пользователя в из системы', () => {
    const action = logoutUser.fulfilled(null, '')
    const state = reducer(initialState, action)

    expect(state).toEqual({
      user: null,
      success: true,
      isAuthChecked: false,
      loading: false,
      error: null
    })
  })
})