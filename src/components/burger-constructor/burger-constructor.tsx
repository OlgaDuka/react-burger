import React, {FC, useEffect} from 'react'
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import {useModal} from '../../hooks/useModal'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import Buns from './buns/buns'
import styles from './burger-constructor.module.css'
import {NavigateFunction, useNavigate} from 'react-router-dom'
import Loader from '../loader/loader'
import {useAppDispatch, useAppSelector} from '../../services'
import {clearOrder} from '../../services/slices/order'
import {clearBurger} from '../../services/slices/burger-constructor'
import {resetCount} from '../../services/slices/ingredients'
import {sendOrder} from '../../services/thunks'
import {IIngredientItem} from '../../utils/types'

const BurgerConstructor: FC = () => {
  const { isOpenModal, openModal, closeModal } = useModal()
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useAppDispatch()

  const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked)
  const { loading, hasError } = useAppSelector((state) => state.order)
  const { totalPrice, bun, fillings } =
    useAppSelector((state) => state.burgerConstructor)

  const handleOrder = (): void => {
    if (isAuthChecked) {
      const ingredients = []
      if (bun) {
        ingredients.push(bun._id)
      } else return
      if (fillings.length > 0) {
        fillings.forEach((item: IIngredientItem) => ingredients.push(item._id))
        ingredients.push(bun._id)
      } else return
      dispatch(sendOrder(ingredients))
    } else navigate('/login')
  }

  const closeOrder = (): void => {
    closeModal()
    dispatch(clearOrder())
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
        <Button
          data-testid='order_button'
          htmlType="button"
          type="primary"
          size="large"
          disabled={!totalPrice}
          onClick={handleOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isOpenModal
      ? <Modal onClose={closeOrder} header={loading ? 'Формируем заказ' : ''}>
          {loading ? <Loader /> : <OrderDetails />}
        </Modal>
      : null
      }
    </section>
  )
}

export default BurgerConstructor

