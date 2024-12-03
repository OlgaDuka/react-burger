import React from 'react'
import BlankConstructor from '../../blank-constructor/blank-constructor'
import {useDispatch, useSelector} from 'react-redux'
import {useDrop} from 'react-dnd'
import {addIngredient} from '../../../../services/actions/constructor'
import styles from './middle-constructor.module.css'
import {changeCount} from '../../../../services/actions/ingredients'
import DraggableElement from './draggable-element/draggable-element'
const MiddleConstructor = () => {
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
        ? fillings.map((item, index) => <DraggableElement item={item} index={index} />)
        : <li className={`${styles.item_wrapper} mt-4 mb-4`}>
          <BlankConstructor isHover={isHoverIngredient} text='Выберите начинку'/>
        </li>
      }
    </ul>
  )
}

export default MiddleConstructor