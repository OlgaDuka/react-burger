import React from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import Modal from '../../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import {useModal} from '../../../hooks/useModal'
import {IngredientItemType} from '../../../utils/types'

import styles from './ingredient-card.module.css'
import {useDispatch} from 'react-redux'
import {clearSelectedIngredient, setSelectedIngredient} from '../../../services/actions/details'
import {useDrag} from 'react-dnd'

const IngredientCard = ({ item }) => {
  const { image, name, price, count } = item
  const dispatch = useDispatch()
  const { isOpenModal, openModal, closeModal } = useModal()

  const [{ opacity }, dragRef] = useDrag({
    type: item.type === 'bun' ? 'bun' : 'ingredients',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const handleOpenModal = () => {
    dispatch(setSelectedIngredient(item))
    openModal()
  }

  const handleCloseModal = () => {
    dispatch(clearSelectedIngredient())
    closeModal()
  }

  return (
    <div>
      <div ref={dragRef} className={`${styles.card} mt-6 mb-8`} style={{ opacity }} onClick={handleOpenModal}>
        <img className='mt-1' src={image} alt={name}/>
        {!!count && <Counter count={count} size="default" extraClass="m-1" />}
        <div className={`${styles.currency} mt-1`}>
          <span className='text text_type_digits-default mr-2'>{price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <p className='text_type_main-default mt-2 mb-2'>{name}</p>
      </div>
      {isOpenModal
      ? <Modal onClose={handleCloseModal} header='Детали ингредиента'>
          <IngredientDetails />
        </Modal>
      : null
      }
    </div>
  );
};

IngredientCard.propTypes = {
  item: IngredientItemType.isRequired,
  hasCount: PropTypes.bool
}

export default IngredientCard
