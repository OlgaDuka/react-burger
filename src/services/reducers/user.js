import {LOGOUT_USER, SET_USER, SET_USER_ERROR, SET_USER_SUCCESS} from '../actions/user'

const initialState = {
  user: {
    email: '',
    name: ''
  },
  isAuthChecked: false,
  loading: false,
  hasError: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {...state, loading: true }
    }
    case SET_USER_SUCCESS: {
      return { ...state, loading: false, hasError: false, user: action.payload, isAuthChecked: true }
    }
    case SET_USER_ERROR: {
      return { ...state, loading: false, hasError: true, user: { email: '', name: '' }, isAuthChecked: false }
    }
    case LOGOUT_USER: {
      return { state: initialState }
    }
    default:
      return state
  }
}