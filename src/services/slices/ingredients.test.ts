import {IIngredientsState} from "../types/state-types";
import {DATA_BURGERS, DATA_BURGERS_WITH_COUNT} from "../../utils/mock-data";
import {fetchIngredients} from "../thunks";
import reducer, {resetCount} from "./ingredients";
import {groupIngredientsById} from "../functions";

describe('ingredientsSlice', () => {
  const initialState: IIngredientsState = {
    ingredients: [],
    ingredientsMap: {},
    loading: false,
    hasError: false
  }

  it('получаем начальное состояние', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  it('обнуляем счетчики ингредиентов', () => {
    const stateBefore = {
      ...initialState,
      ingredients: DATA_BURGERS_WITH_COUNT,
      ingredientsMap: groupIngredientsById(DATA_BURGERS_WITH_COUNT)
    }
    const action = resetCount()
    const state = reducer(stateBefore, action)

    expect(state).toEqual({
      ...state,
      ingredients: DATA_BURGERS,
      ingredientsMap: groupIngredientsById(DATA_BURGERS)
    })
  })

  it('получаем список доступных ингредиентов', () => {
    const payload = DATA_BURGERS
    const groupIngredients = groupIngredientsById(DATA_BURGERS)
    const action = fetchIngredients.fulfilled(payload, '')
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ingredients: DATA_BURGERS,
      ingredientsMap: groupIngredients,
      loading: false,
      hasError: false
    })
  })
})