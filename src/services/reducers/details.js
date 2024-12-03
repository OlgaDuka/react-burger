import {CLEAR_SELECTED_INGREDIENT, SET_SELECTED_INGREDIENT} from '../actions/details'

const initialState = {
  selectedIngredient: null
}

export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_INGREDIENT: {
      return { ...state, selectedIngredient: action.payload }
    }
    case CLEAR_SELECTED_INGREDIENT: {
      return {...initialState}
    }
    default:
      return state
  }
}