import React from 'react'
import styles from './order-details.module.css'
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

const OrderDetails = ({orderId}) => {
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

OrderDetails.propTypes = { orderId: PropTypes.string }
export default OrderDetails