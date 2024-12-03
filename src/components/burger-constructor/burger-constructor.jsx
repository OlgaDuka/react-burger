import React from 'react';
import {useSelector} from 'react-redux'
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import {useModal} from '../../hooks/useModal'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import Buns from './buns/buns'
import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {
  const { isOpenModal, openModal, closeModal } = useModal()
  const totalPrice = useSelector(state => state.burgerConstructor.totalPrice)

  return (
    <section className={`${styles.section} mt-25`}>
      <Buns />
      <div className={`${styles.total} mt-10 pr-4`}>
        <p className='text text_type_digits-medium mr-4'>{totalPrice}</p>
        <CurrencyIcon className='mr-10' type="primary"/>
        <Button htmlType="button" type="primary" size="large" disabled={!totalPrice} onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isOpenModal
      ? <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      : null
      }
    </section>
  )
}

export default BurgerConstructor

