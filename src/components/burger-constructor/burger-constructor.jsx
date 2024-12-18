import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import {useModal} from '../../hooks/useModal'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import Buns from './buns/buns'
import styles from './burger-constructor.module.css'
import {sendOrder} from '../../services/actions/order'
import {useNavigate} from 'react-router-dom'
import Loader from '../loader/loader'
import {resetCount} from '../../services/actions/ingredients'
import {clearBurger} from '../../services/actions/constructor'

const BurgerConstructor = () => {
  const navigate = useNavigate()
  const { isOpenModal, openModal, closeModal } = useModal()
  const isAuthChecked = useSelector(state => state.user.isAuthChecked)
  const loading = useSelector(state => state.order.loading)
  const hasError = useSelector(state => state.order.hasError)
  const totalPrice = useSelector(state => state.burgerConstructor.totalPrice)
  const bun = useSelector(state => state.burgerConstructor.bun)
  const fillings = useSelector(state => state.burgerConstructor.fillings)
  const dispatch = useDispatch()

  const handleOrder = () => {
    if (isAuthChecked) {
      const ingredients = []
      if (bun) {
        ingredients.push(bun._id)
      } else return
      if (fillings.length > 0) {
        fillings.forEach(item => ingredients.push(item._id))
        ingredients.push(bun._id)
      } else return
      dispatch(sendOrder(ingredients))
    } else navigate('/login')
  }

  useEffect(() => {
    if (loading) {
      openModal()
    }
  }, [loading, openModal])

  useEffect(() => {
    if (!isOpenModal) return
    if (!hasError && !loading) {
      dispatch(clearBurger())
      dispatch(resetCount())
    }
  }, [isOpenModal, hasError, loading, dispatch])

  return (
    <section className={`${styles.section} mt-25`}>
      <Buns />
      <div className={`${styles.total} mt-10 pr-4`}>
        <p className='text text_type_digits-medium mr-4'>{totalPrice}</p>
        <CurrencyIcon className='mr-10' type="primary"/>
        <Button htmlType="button" type="primary" size="large" disabled={!totalPrice} onClick={handleOrder}>
          Оформить заказ
        </Button>
      </div>
      {isOpenModal
      ? <Modal onClose={closeModal}>
          {loading ? <Loader /> : <OrderDetails />}
        </Modal>
      : null
      }
    </section>
  )
}

export default BurgerConstructor

