import {ADD_INGREDIENT, CLEAR_BURGER, DELETE_INGREDIENT} from '../actions/constructor'

const initialState = {
  bun: null,
  fillings: []
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {...state, bun: action.payload}
      }
      return {...state, fillings: [...state.fillings, action.payload]}
    }
    case DELETE_INGREDIENT: {
      const lostIngredients = state.fillings.filter((item) => item.oguid !== action.payload.oguid)
      return {...state, fillings: lostIngredients}
    }
    case CLEAR_BURGER: {
      return {...initialState}
    }
    default:
      return state
  }
}