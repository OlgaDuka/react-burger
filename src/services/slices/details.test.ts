import reducer, {clearSelectedIngredient, initialState, setSelectedIngredient} from './details'
import {DATA_BURGERS} from '../../utils/mock-data'

describe('detailsSlice', () => {
  it('получаем начальное состояние', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  it('выбираем ингредиент', () => {
    const payload = {...DATA_BURGERS[0], count: 0}
    const action = setSelectedIngredient(payload)
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      selectedIngredient: {...DATA_BURGERS[0], count: 0 }
    })
  })

  it('очищаем текущий ингредиент', () => {
    const action = clearSelectedIngredient()
    const state = reducer(initialState, action)

    expect(state).toEqual(initialState)
  })
})