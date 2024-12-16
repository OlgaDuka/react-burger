import {getUserRequest, loginUserRequest, logoutUserRequest, updateUserRequest} from '../../utils/api'

export const SET_USER = 'SET_USER'
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS'
export const SET_USER_ERROR = 'SET_USER_ERROR'
export const LOGOUT_USER = 'LOGOUT_USER'

export const getUser = () => (dispatch) => {
  dispatch({ type: SET_USER })

  getUserRequest()
    .then((result) => {
      dispatch({
        type: SET_USER_SUCCESS,
        payload: result
      })
    })
    .catch(() => dispatch({
      type: SET_USER_ERROR
    }))
}

export const updateUser = (user) => (dispatch) => {
  dispatch({ type: SET_USER })

  updateUserRequest(user)
    .then((result) => {
      dispatch({
        type: SET_USER_SUCCESS,
        payload: result
      })
    })
    .catch(() => dispatch({
      type: SET_USER_ERROR
    }))
}

export const loginUser = (user) => (dispatch) => {
  dispatch({ type: SET_USER })

  loginUserRequest(user).then((result) => {
    dispatch({
      type: SET_USER_SUCCESS,
      payload: result
    })
  })
    .catch(() => dispatch({
      type: SET_USER_ERROR
    }))
}

export const logoutUser = () => (dispatch) => {
  logoutUserRequest().then(() => dispatch({ type: LOGOUT_USER }))
}
