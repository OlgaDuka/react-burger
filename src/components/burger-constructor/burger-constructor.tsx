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
import {sendOrder} from '../../services/thunks'
import {IIngredientItem} from '../../utils/types'
import {clearBurger} from "../../services/slices/burger-constructor";
import {resetCount} from "../../services/slices/ingredients";

const BurgerConstructor: FC = () => {
  const { isOpenModal, openModal, closeModal } = useModal()
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useAppDispatch()

  const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked)
  const { loading, hasError } = useAppSelector((state) => state.order)
  const { totalPrice, bun, fillings } =
    useAppSelector((state) => state.burgerConstructor)

  const handleOrder = (): void => {
    if (!bun) return

    const ingredients = [
      bun._id,
      ...fillings.map((item: IIngredientItem)=> item._id),
      bun._id
    ]

    if (isAuthChecked) {
      dispatch(sendOrder(ingredients))
    } else {
      return navigate('/login')
    }
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
          disabled={!bun || fillings.length === 0}
          onClick={handleOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isOpenModal
      ? <Modal onClose={closeOrder} header={loading ? 'Формируем заказ' : ''} key={loading ? 'loading' : 'success'}>
          {loading ? <Loader /> : <OrderDetails />}
        </Modal>
      : null
      }
    </section>
  )
}

export default BurgerConstructor

