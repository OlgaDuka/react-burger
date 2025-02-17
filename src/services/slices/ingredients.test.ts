import {DATA_BURGERS, DATA_BURGERS_WITH_COUNT} from '../../utils/mock-data'
import {fetchIngredients} from '../thunks'
import reducer, {initialState, resetCount} from './ingredients'
import {groupIngredientsById} from '../functions'
import {IIngredientsState} from '../types/state-types'

describe('ingredientsSlice', () => {
  it('получаем начальное состояние', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  it('обнуляем счетчики ингредиентов', () => {
    const stateBefore: IIngredientsState = {
      ...initialState,
      ingredients: DATA_BURGERS_WITH_COUNT,
      ingredientsMap: groupIngredientsById(DATA_BURGERS_WITH_COUNT)
    }
    const action = resetCount()
    const state = reducer(stateBefore, action)

    expect(state).toEqual({
      ...initialState,
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
      ...initialState,
      ingredients: DATA_BURGERS,
      ingredientsMap: groupIngredients,
    })
  })
})