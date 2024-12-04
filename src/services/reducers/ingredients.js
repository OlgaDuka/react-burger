import {
  DECREASE_INGREDIENT,
  GET_INGREDIENTS,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT
} from '../actions/ingredients'

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
    case INCREASE_INGREDIENT: {
      const modifiedIngredient = state.ingredients.map((item) => {
        if (item._id === action.payload) {
          if (item.type === 'bun') {
            item.count+=2
          } else {
            item.count++
          }
        }
        return item
      })

      return {...state, ingredients: modifiedIngredient }
    }
    case DECREASE_INGREDIENT: {
      const modifiedIngredient = state.ingredients.map((item) => {
        if (item._id === action.payload) {
          if (item.type === 'bun') {
            item.count = 0
          } else {
            item.count--
          }
        }
        return item
      })

      return {...state, ingredients: modifiedIngredient }
    }
    default:
      return state
  }
}