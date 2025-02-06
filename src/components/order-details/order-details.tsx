import React, {FC} from 'react'
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './order-details.module.css'
import {useAppSelector} from '../../services'

const OrderDetails: FC = () => {
  const { number } = useAppSelector((state) => state.order.order)

  return (
    <div className={styles.card}>
      <div className='text text_type_digits-large mb-5'>{number}</div>
      <div className='text text_type_main-medium mb-15'>идентификатор заказа</div>
      <CheckMarkIcon type="primary" className={`${styles.check} mb-15`}/>
      <div className='text text_type_main-default mb-2'>Ваш заказ начали готовить</div>
      <div className='text text_type_main-default text_color_inactive mb-20'>Дождитесь готовности на орбитальной станции</div>
    </div>
  )
}

export default OrderDetails