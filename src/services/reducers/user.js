import {LOGOUT_USER, SET_AUTH_CHECKED, SET_USER, SET_USER_ERROR, SET_USER_SUCCESS} from '../actions/user'

const initialState = {
  user: null,
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
      return { ...state, loading: false, hasError: false, user: action.payload }
    }
    case SET_USER_ERROR: {
      return { ...state, loading: false, hasError: true, user: null }
    }
    case LOGOUT_USER: {
      return { ...state, user: null }
    }
    case SET_AUTH_CHECKED: {
      return { ...state, isAuthChecked: action.payload }
    }
    default:
      return state
  }
}