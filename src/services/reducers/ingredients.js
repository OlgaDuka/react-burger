import {GET_INGREDIENTS, GET_INGREDIENTS_ERROR, GET_INGREDIENTS_SUCCESS} from '../actions/ingredients'

const initialState = {
  ingredients: [],
  loading: false,
  hasError: false
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return { ...state, loading: true }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, loading: false, hasError: false, ingredients: action.payload }
    }
    case GET_INGREDIENTS_ERROR: {
      return { ...state, loading: false, hasError: true, ingredients: [] }
    }
    default:
      return state
  }
}