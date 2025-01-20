import React, {useEffect} from 'react'
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import {useModal} from '../../hooks/useModal'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import Buns from './buns/buns'
import styles from './burger-constructor.module.css'
import {NavigateFunction, useNavigate} from 'react-router-dom'
import Loader from '../loader/loader'
import {RootState, useAppDispatch, useAppSelector} from "../../redux"
import {clearOrder} from "../../redux/slices/order"
import {clearBurger} from "../../redux/slices/burger-constructor"
import {resetCount} from "../../redux/slices/ingredients";
import {sendOrder} from "../../redux/thunks";
import {IngredientItem} from "../../utils/types";

const BurgerConstructor = () => {
  const { isOpenModal, openModal, closeModal } = useModal()
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useAppDispatch()

  const isAuthChecked = useAppSelector((state: RootState) => state.user.isAuthChecked)
  const { loading, hasError } = useAppSelector((state: RootState) => state.order)
  const { totalPrice, bun, fillings } =
    useAppSelector((state: RootState) => state.burgerConstructor)

  const handleOrder = (): void => {
    if (isAuthChecked) {
      const ingredients = []
      if (bun) {
        ingredients.push(bun._id)
      } else return
      if (fillings.length > 0) {
        fillings.forEach((item: IngredientItem) => ingredients.push(item._id))
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
        <Button htmlType="button" type="primary" size="large" disabled={!totalPrice} onClick={handleOrder}>
          Оформить заказ
        </Button>
      </div>
      {isOpenModal
      ? <Modal onClose={closeOrder}>
          {loading ? <Loader /> : <OrderDetails />}
        </Modal>
      : null
      }
    </section>
  )
}

export default BurgerConstructor

