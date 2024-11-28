import React, {useEffect} from 'react'
import styles from './order-details.module.css'
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch, useSelector} from 'react-redux'
import {sendOrder} from '../../services/actions/order'

const OrderDetails = () => {
  const orderId = useSelector(state => state.order.orderId)
  const dispatch = useDispatch()
  const ingredients = ['609646e4dc916e00276b286e','643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941']

  useEffect(() => {
    dispatch(sendOrder(ingredients))
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