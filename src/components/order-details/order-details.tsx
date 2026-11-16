import React, {FC} from 'react'
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-details.module.css'
import {useAppSelector} from '../../services'

const OrderDetails: FC = () => {
  // Заказ может быть ещё не загружен или не создан — компонент не должен падать.
  const order = useAppSelector((state) => state.order?.order)
  const number = order?.number ?? 0

  return (
    <div data-testid='order_details' className={styles.card}>
      <div
        data-testid='order_number'
        className='text text_type_digits-large mb-5'>
        {number}
      </div>
      <div className='text text_type_main-medium mb-15'>идентификатор заказа</div>
      <CheckMarkIcon type="primary" className={`${styles.check} mb-15`}/>
      <div className='text text_type_main-default mb-2'>Ваш заказ начали готовить</div>
      <div className='text text_type_main-default text_color_inactive mb-20'>Дождитесь готовности на орбитальной станции</div>
    </div>
  )
}

export default OrderDetails