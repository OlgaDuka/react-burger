import React, {useState} from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient-card.module.css'
import Modal from '../../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'

const IngredientCard = ({item, hasCount = false}) => {
  const { image, name, price } = item
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <div>
      <div className={`${styles.card} mt-6 mb-8`} onClick={() => setIsOpenModal(true)}>
        <img className='mt-1' src={image} alt={name}/>
        {hasCount && <Counter count={1} size="default" extraClass="m-1" />}
        <div className={`${styles.currency} mt-1`}>
          <span className='text text_type_digits-default mr-2'>{price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <p className='text_type_main-default mt-2 mb-2'>{name}</p>
      </div>
      {isOpenModal
      ? <Modal onClose={() => setIsOpenModal(false)} header='Детали ингредиента'>
          <IngredientDetails item={item} />
        </Modal>
      : null
      }
    </div>
  );
};

export default IngredientCard
