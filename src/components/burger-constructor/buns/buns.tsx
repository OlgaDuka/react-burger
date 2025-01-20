import React from 'react'
import {useDrop} from 'react-dnd'
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'

import BlankConstructor from '../blank-constructor/blank-constructor'
import Filling from './filling/filling'
import {AppDispatch, RootState, useAppDispatch, useAppSelector} from '../../../services'
import {IngredientItem} from '../../../utils/types'
import {addIngredient, deleteIngredient} from '../../../services/slices/burger-constructor'
import {decreaseIngredient, increaseIngredient} from '../../../services/slices/ingredients'

const Buns = () => {
  const bun: IngredientItem | null = useAppSelector((state: RootState) => state.burgerConstructor.bun)
  const dispatch: AppDispatch = useAppDispatch()

  const moveBun = (item: IngredientItem) => {
    if (bun) {
      dispatch(deleteIngredient(bun))
      dispatch(decreaseIngredient(bun._id))
    }
    dispatch(addIngredient(item))
    dispatch(increaseIngredient(item._id))
  }

  const [{ isHoverBun }, dropBun] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHoverBun: monitor.isOver()
    }),
    drop: (item: IngredientItem) => moveBun(item)
  })

  return (
    <div ref={dropBun}>
      {bun
        ? <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        : <BlankConstructor isHover={isHoverBun} position='top' text='Выберите булки'/>
      }
        <Filling />
      {bun
        ? <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        : <BlankConstructor isHover={isHoverBun} position='bottom' text='Выберите булки'/>
      }
    </div>
  )
}

export default Buns