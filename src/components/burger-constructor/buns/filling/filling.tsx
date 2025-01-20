import React from 'react'
import {useDrop} from 'react-dnd'

import BlankConstructor from '../../blank-constructor/blank-constructor'
import DraggableElement from './draggable-element/draggable-element'
import styles from './filling.module.css'
import {AppDispatch, RootState, useAppDispatch, useAppSelector} from '../../../../redux'
import {IngredientItem} from "../../../../utils/types";
import {addIngredient} from "../../../../redux/slices/burger-constructor";
import {increaseIngredient} from "../../../../redux/slices/ingredients";

const Filling = () => {
  const fillings: IngredientItem[] = useAppSelector((state: RootState) => state.burgerConstructor.fillings)
  const dispatch: AppDispatch = useAppDispatch()

  const moveIngredient = (itemId: IngredientItem) => {
    dispatch(addIngredient(itemId))
    dispatch(increaseIngredient(itemId._id))
  }

  const [{ isHoverIngredient }, dropIngredient] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHoverIngredient: monitor.isOver()
    }),
    drop: (itemId: IngredientItem) => moveIngredient(itemId)
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