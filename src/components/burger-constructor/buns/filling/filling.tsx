import React, {FC} from 'react'
import {useDrop} from 'react-dnd'

import BlankConstructor from '../../blank-constructor/blank-constructor'
import DraggableElement from './draggable-element/draggable-element'
import styles from './filling.module.css'
import {AppDispatch, useAppDispatch, useAppSelector} from '../../../../services'
import {IIngredientItem} from '../../../../utils/types'
import {addIngredient} from '../../../../services/slices/burger-constructor'
import {increaseIngredient} from '../../../../services/slices/ingredients'
import {v4 as uuidv4} from 'uuid'

const Filling: FC = () => {
  const fillings: IIngredientItem[] = useAppSelector((state) => state.burgerConstructor.fillings)
  const dispatch: AppDispatch = useAppDispatch()

  const moveIngredient = (itemId: IIngredientItem): void => {
    const oguid = uuidv4()
    dispatch(addIngredient({ data: itemId, oguid }))
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