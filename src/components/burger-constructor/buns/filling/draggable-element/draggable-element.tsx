import React, {FC, RefObject, useRef} from 'react'
import {useDrag, useDrop} from 'react-dnd'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import {IDraggableElProps as IProps} from '../../../../../utils/types'
import styles from '../filling.module.css'
import {AppDispatch, useAppDispatch} from '../../../../../services'
import {deleteIngredient, sortingIngredients} from '../../../../../services/slices/burger-constructor'
import {decreaseIngredient} from '../../../../../services/slices/ingredients'

const DraggableElement: FC<IProps> = (props: IProps) => {
  const { item, index } = props
  const ref: RefObject<HTMLLIElement> = useRef(null)
  const dispatch: AppDispatch = useAppDispatch()

  const removeIngredient = (): void => {
    dispatch(deleteIngredient(item))
    dispatch(decreaseIngredient(item._id))
  }

  const moveItem = (fromIndex: number, toIndex: number) => dispatch(sortingIngredients({fromIndex, toIndex}))

  const [{ opacity }, dragRef] = useDrag({
    type: 'filling',
    item: { index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  const [, dropRef] = useDrop({
    accept: 'filling',
    hover: (item: any, monitor) => {
      if (!ref.current) return

      const fromIndex = item.index
      const toIndex = index

      if (fromIndex === toIndex) return

      const toBoundingRect = ref.current?.getBoundingClientRect()
      const toMiddleY = (toBoundingRect.bottom - toBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const toActualY = clientOffset!.y - toBoundingRect.top

      if (fromIndex < toIndex && toActualY < toMiddleY) return
      if (fromIndex > toIndex && toActualY > toMiddleY) return

      moveItem(fromIndex, toIndex)
      item.index = toIndex
    },
  })

  dragRef(dropRef(ref))

  return (
    <>
    <li ref={ref} style={{ opacity }} className={`${styles.item_wrapper} mt-4 mb-4`}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => removeIngredient()}
      />
    </li>
    </>
  )
}

export default DraggableElement