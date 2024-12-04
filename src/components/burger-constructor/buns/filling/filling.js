import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useDrop} from 'react-dnd'

import {addIngredient} from '../../../../services/actions/constructor'
import {changeCount} from '../../../../services/actions/ingredients'
import BlankConstructor from '../../blank-constructor/blank-constructor'
import DraggableElement from './draggable-element/draggable-element'
import styles from './filling.module.css'

const Filling = () => {
  const fillings = useSelector(state => state.burgerConstructor.fillings)
  const dispatch = useDispatch()

  const moveIngredient = (itemId) => {
    dispatch(addIngredient(itemId))
    dispatch(changeCount(itemId._id, 'plus'))
  }

  const [{ isHoverIngredient }, dropIngredient] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHoverIngredient: monitor.isOver()
    }),
    drop: (itemId) => moveIngredient(itemId)
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