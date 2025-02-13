import {v4 as uuidv4} from 'uuid'
import {IConstructorState} from "../types/state-types";
import {DATA_BURGERS} from "../../utils/mock-data";
import reducer, {addIngredient, clearBurger, deleteIngredient, sortingIngredients} from "./burger-constructor";

const id = uuidv4()
const mock_fillings = [DATA_BURGERS[2], DATA_BURGERS[3], DATA_BURGERS[4], DATA_BURGERS[5]]

describe('detailsSlice', () => {
  const initialState: IConstructorState = {
    bun: null,
    fillings: [],
    totalPrice: 0
  }

  it('получаем начальное состояние', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  it('добавляем ингредиент типа bun', () => {
    const payload = { data: DATA_BURGERS[0], oguid: id }
    const action = addIngredient(payload)
    const state = reducer(initialState, action)

    expect(state).toEqual({
      bun: { ...DATA_BURGERS[0], oguid: id },
      fillings: [],
      totalPrice: 2510
    })
  })

  it('добавляем ингредиент типа не-bun', () => {
    const payload = { data: DATA_BURGERS[1], oguid: id }
    const action = addIngredient(payload)
    const state = reducer(initialState, action)

    expect(state).toEqual({
      bun: null,
      fillings: [{ ...DATA_BURGERS[1], oguid: id }],
      totalPrice: 3000
    })
  })

  it('удаляем ингредиент типа bun', () => {
    const stateBefore = {
      bun: DATA_BURGERS[0],
      fillings: mock_fillings,
      totalPrice: 4376
    }
    const payload = DATA_BURGERS[0]
    const action = deleteIngredient(payload)
    const state = reducer(stateBefore, action)

    expect(state).toEqual({
      ...state,
      bun: null,
      totalPrice: 1866
    })
  })

  it('удаляем ингредиент типа не-bun', () => {
    const stateBefore = {
      bun: DATA_BURGERS[0],
      fillings: mock_fillings,
      totalPrice: 4376
    }
    const payload = DATA_BURGERS[5]
    const action = deleteIngredient(payload)
    const state = reducer(stateBefore, action)

    expect(state).toEqual({
      ...state,
      fillings: [DATA_BURGERS[2], DATA_BURGERS[3], DATA_BURGERS[4]],
      totalPrice: 4361
    })
  })

  it('сортируем ингредиенты', () => {
    const action = sortingIngredients({ fromIndex: 3, toIndex: 0 })
    const state = reducer({...initialState, fillings: mock_fillings }, action)

    expect(state).toEqual({
      ...state,
      fillings: [DATA_BURGERS[5], DATA_BURGERS[2], DATA_BURGERS[3], DATA_BURGERS[4]],
    })
  })

  it('очищаем конструктор', () => {
    const action = clearBurger()
    const state = reducer(initialState, action)

    expect(state).toEqual(initialState)
  })

})