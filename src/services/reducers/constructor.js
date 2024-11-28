import {ADD_INGREDIENT, CLEAR_BURGER, DELETE_INGREDIENT} from '../actions/constructor'

const initialState = {
  bun: null,
  ingredients: []
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {...state, bun: action.payload}
      }
      return {...state, ingredients: [...state.ingredients, action.payload]}
    }
    case DELETE_INGREDIENT: {
      const lostIngredients = state.ingredients.filter((item) => item.id !== action.payload.id)
      return {...state, ingredients: lostIngredients}
    }
    case CLEAR_BURGER: {
      return {...initialState}
    }
    default:
      return state
  }
}