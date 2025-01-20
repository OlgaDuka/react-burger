import React, {FC} from 'react'
import {useDrop} from 'react-dnd'

import BlankConstructor from '../../blank-constructor/blank-constructor'
import DraggableElement from './draggable-element/draggable-element'
import styles from './filling.module.css'
import {AppDispatch, RootState, useAppDispatch, useAppSelector} from '../../../../services'
import {IIngredientItem} from '../../../../utils/types'
import {addIngredient} from '../../../../services/slices/burger-constructor'
import {increaseIngredient} from '../../../../services/slices/ingredients'

const Filling: FC = () => {
  const fillings: IIngredientItem[] = useAppSelector((state: RootState) => state.burgerConstructor.fillings)
  const dispatch: AppDispatch = useAppDispatch()

  const moveIngredient = (itemId: IIngredientItem): void => {
    dispatch(addIngredient(itemId))
    dispatch(increaseIngredient(itemId._id))
  }

  const [{ isHoverIngredient }, dropIngredient] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHoverIngredient: monitor.isOver()
    }),
    drop: (itemId: IIngredientItem) => moveIngredient(itemId)
  })

  return (
    <ul ref={dropIngredient} className={`${styles.container} mb-0`}>
      {fillings && fillings.length
        ? fillings.map((item, index) => <DraggableElement key={item.oguid} item={item} index={index} />)
        : <li className={`${styles.item_wrapper} mt-4 mb-4`}>
          <BlankConstructor isHover={isHoverIngredient} text='Выберите начинку'/>
        </li>
      }
    </ul>
  )
}

export default Filling