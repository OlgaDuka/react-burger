import {getIngredientsRequest} from '../../utils/api'
export const GET_INGREDIENTS = 'GET_INGREDIENTS'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR'

export const getIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS })

  getIngredientsRequest()
    .then((res) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: res.data
      })
    })
    .catch(() => dispatch({
      type: GET_INGREDIENTS_ERROR,
      payload: []
    }))
}