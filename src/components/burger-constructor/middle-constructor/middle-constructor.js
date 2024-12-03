import React from 'react'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import BlankConstructor from '../blank-constructor/blank-constructor'
import {useDispatch, useSelector} from 'react-redux'
import {useDrop} from 'react-dnd'
import {addIngredient, deleteIngredient} from '../../../services/actions/constructor'
import styles from './middle-constructor.module.css'
import {changeCount} from '../../../services/actions/ingredients'
const MiddleConstructor = () => {
  const fillings = useSelector(state => state.burgerConstructor.fillings)
  const dispatch = useDispatch()

  const moveIngredient = (itemId) => {
    dispatch(addIngredient(itemId))
    dispatch(changeCount(itemId._id, 'plus'))
  }

  const removeIngredient = (itemId) => {
    dispatch(deleteIngredient(itemId))
    dispatch(changeCount(itemId._id, 'minus'))
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
        ? fillings.filter(item => item.type !== 'bun').map((item) => (
          <li key={item.oguid} className={`${styles.item_wrapper} mt-4 mb-4`}>
            <DragIcon type="primary"/>
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => removeIngredient(item)}
            />
          </li>
        ))
        : <li key={1} className={`${styles.item_wrapper} mt-4 mb-4`}>
          <BlankConstructor isHover={isHoverIngredient} text='Выберите начинку'/>
        </li>
      }
    </ul>
  )
}

export default MiddleConstructor