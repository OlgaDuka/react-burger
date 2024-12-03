import React from 'react';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import {useModal} from '../../hooks/useModal'
import styles from './burger-constructor.module.css'
import BunConstructor from './bun-constructor/bun-constructor'
import {useSelector} from 'react-redux'

const BurgerConstructor = () => {
  const { isOpenModal, openModal, closeModal } = useModal()
  const totalPrice = useSelector(state => state.burgerConstructor.totalPrice)

  return (
    <section className={`${styles.section} mt-25`}>
      <BunConstructor />
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

