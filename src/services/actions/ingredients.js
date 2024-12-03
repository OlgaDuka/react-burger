import {getIngredientsRequest} from '../../utils/api'
export const GET_INGREDIENTS = 'GET_INGREDIENTS'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR'
export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT'

export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT'

export const getIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS })

  getIngredientsRequest()
    .then((res) => {
      const ingredients = res.data.map((item) => {
        return { ...item, count: 0 }
      })
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: ingredients
      })
    })
    .catch(() => dispatch({
      type: GET_INGREDIENTS_ERROR,
      payload: []
    }))
}

export const changeCount = (itemId, operation = 'plus') => (dispatch) => {
  if (operation === 'plus') {
    dispatch({
      type: INCREASE_INGREDIENT,
      payload: itemId
    })
  } else {
    dispatch({
      type: DECREASE_INGREDIENT,
      payload: itemId
    })
  }
}