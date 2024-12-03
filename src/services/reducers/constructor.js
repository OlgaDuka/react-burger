import {ADD_INGREDIENT, CLEAR_BURGER, DELETE_INGREDIENT, SORTING_INGREDIRNTS} from '../actions/constructor'

const initialState = {
  bun: null,
  fillings: [],
  totalPrice: 0
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload,
          totalPrice: state.totalPrice + action.payload.price * 2
        }
      }
      return {
        ...state,
        fillings: [...state.fillings, action.payload],
        totalPrice: state.totalPrice + action.payload.price
      }
    }
    case DELETE_INGREDIENT: {
      const lostIngredients = state.fillings.filter((item) => item.oguid !== action.payload.oguid)
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: null,
          totalPrice: state.totalPrice - action.payload.price * 2
        }
      }
      return {
        ...state,
        fillings: lostIngredients,
        totalPrice: state.totalPrice - action.payload.price
      }
    }
    case SORTING_INGREDIRNTS: {
      const ingredients = [...state.fillings]
      ingredients.splice(action.payload.toIndex, 0,
        ingredients.splice(action.payload.fromIndex, 1)[0])
      return {...state, fillings: ingredients}
    }
    case CLEAR_BURGER: {
      return {...initialState}
    }
    default:
      return state
  }
}