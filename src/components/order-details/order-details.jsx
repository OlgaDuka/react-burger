import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import {sendOrder} from '../../services/actions/order'
import styles from './order-details.module.css'

const OrderDetails = () => {
  const orderId = useSelector(state => state.order.orderId)
  const bun = useSelector(state => state.burgerConstructor.bun)
  const fillings = useSelector(state => state.burgerConstructor.fillings)
  const dispatch = useDispatch()

  const ingredients = []
  ingredients.push(bun._id)
  fillings.forEach(item => ingredients.push(item._id))
  ingredients.push(bun._id)

  useEffect(() => {
    const controller = new AbortController()

    dispatch(sendOrder(ingredients))

    return () => {
      controller.abort()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.card}>
      <div className='text text_type_digits-large mb-5'>{orderId}</div>
      <div className='text text_type_main-medium mb-15'>идентификатор заказа</div>
      <CheckMarkIcon type="primary" className={`${styles.check} mb-15`}/>
      <div className='text text_type_main-default mb-2'>Ваш заказ начали готовить</div>
      <div className='text text_type_main-default text_color_inactive mb-20'>Дождитесь готовности на орбитальной станции</div>
    </div>
  )
}

export default OrderDetails