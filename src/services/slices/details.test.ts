import {IDetailState} from "../types/state-types";
import reducer, {clearSelectedIngredient, setSelectedIngredient} from "./details";
import {DATA_BURGERS} from "../../utils/mock-data";

describe('detailsSlice', () => {
  const initialState: IDetailState = {
    selectedIngredient: {
      name: '',
      image: '',
      calories: 0,
      fat: 0,
      carbohydrates: 0,
      proteins: 0,
      _id: '',
      price: 0,
      type: '',
      count: 0
    }
  }

  it('получаем начальное состояние', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  it('выбираем ингредиент', () => {
    const payload = {...DATA_BURGERS[0], count: 0}
    const action = setSelectedIngredient(payload)
    const state = reducer(initialState, action)

    expect(state).toEqual({ selectedIngredient: {...DATA_BURGERS[0], count: 0 }})
  })

  it('очищаем текущий ингредиент', () => {
    const action = clearSelectedIngredient()
    const state = reducer(initialState, action)

    expect(state).toEqual(initialState)
  })

})