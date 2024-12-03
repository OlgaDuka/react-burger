import React, {useRef} from 'react'
import styles from '../middle-constructor.module.css'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrag, useDrop} from 'react-dnd'
import {deleteIngredient, sortingIngredients} from '../../../../../services/actions/constructor'
import {changeCount} from '../../../../../services/actions/ingredients'
import {useDispatch} from 'react-redux'

const DraggableElement = ({ item, index }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()

  const removeIngredient = (itemId) => {
    dispatch(deleteIngredient(itemId))
    dispatch(changeCount(itemId._id, 'minus'))
  }

  const moveItem = (dragIndex, hoverIndex) => {
    dispatch(sortingIngredients(dragIndex, hoverIndex))
  }

  const [{ opacity }, dragRef] = useDrag({
    type: 'filling',
    item: { index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  const [, dropRef] = useDrop({
    accept: 'filling',
    hover: (item, monitor) => {
      const fromIndex = item.index
      const toIndex = index
      const toBoundingRect = ref.current?.getBoundingClientRect()
      const toMiddleY = (toBoundingRect.bottom - toBoundingRect.top) / 2
      const toActualY = monitor.getClientOffset().y - toBoundingRect.top

      if (fromIndex < toIndex && toActualY < toMiddleY) return
      if (fromIndex > toIndex && toActualY > toMiddleY) return

      moveItem(fromIndex, toIndex)
      item.index = toIndex
    },
  })

  const dragDropRef = dragRef(dropRef(ref))

  return (
    <li ref={dragDropRef} key={item.oguid} style={{ opacity }} className={`${styles.item_wrapper} mt-4 mb-4`}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => removeIngredient(item)}
      />
    </li>
  )
}

export default DraggableElement