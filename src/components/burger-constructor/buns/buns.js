import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useDrop} from 'react-dnd'
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'

import {addIngredient, deleteIngredient} from '../../../services/actions/constructor'
import {changeCount} from '../../../services/actions/ingredients'
import BlankConstructor from '../blank-constructor/blank-constructor'
import Filling from './filling/filling'

const Buns = () => {
  const bun = useSelector(state => state.burgerConstructor.bun)
  const dispatch = useDispatch()

  const moveBun = (item) => {
    if (bun) {
      dispatch(deleteIngredient(bun))
      dispatch(changeCount(bun._id, 'minus'))
    }
    dispatch(addIngredient(item))
    dispatch(changeCount(item._id, 'plus'))
  }

  const [{ isHoverBun }, dropBun] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHoverBun: monitor.isOver()
    }),
    drop: (item) => moveBun(item)
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