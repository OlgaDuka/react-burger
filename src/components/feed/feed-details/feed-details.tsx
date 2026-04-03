import React, {ReactNode, useEffect, useMemo} from 'react'
import {TOrder, TOrderItem} from '../../../utils/types'
import {useAppDispatch, useAppSelector} from '../../../services'
import {useParams} from 'react-router-dom'
import styles from './feed-details.module.css'
import {STATUS_TEXT} from '../../../utils/constants'
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components'
import {getOrder} from '../../../services/thunks'
import { motion } from 'framer-motion'

const FeedDetails = () => {
  const ingredientsAll = useAppSelector((state) => state.ingredients.ingredientsMap)
  const ordersMap: TOrder = useAppSelector((state) => state.ws.ordersMap)
  const order: TOrderItem = useAppSelector((state) => state.order.order)
  const dispatch = useAppDispatch()
  const { id } = useParams()

  // Оптимизируем получение данных о заказе
  const orderDetails = useMemo(() => {
    if (id && ordersMap[id]) return ordersMap[id];
    if (order?._id === id) return order;
      return null;
  }, [id, ordersMap, order]);

  const { uniqueIngredients, totalPrice } = useMemo(() => {
    if (!orderDetails) return { uniqueIngredients: [], totalPrice: 0 };

    const unical_list = orderDetails.ingredients.reduce(
        (acc: Record<string, number>, currentValue) => ({
          ...acc,
          [currentValue]: (acc[currentValue] || 0) + 1
        }), {})

    const unical_arr = Object.entries(unical_list)

    const total = unical_arr.reduce((acc, [id, count]) => {
      const ingredient = ingredientsAll[id]
      return acc + ingredient.price * count
    }, 0)

    return { uniqueIngredients: unical_arr, totalPrice: total };
  }, [orderDetails, ingredientsAll]);

  useEffect(() => {
    if (!orderDetails && id) {
      dispatch(getOrder(id))
    }
  }, [id, dispatch, orderDetails])

  if (!orderDetails) {
      return (
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text text_type_main-default"
          >
              Заказ не найден
          </motion.div>
      )
  }

  const renderIngredient = (item: [string, number]): ReactNode => {
    const [id, count] = item
    const ingredient = ingredientsAll[id]

    if (!ingredient) return null

    return (
      <motion.div
          key={id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={`${styles.info} mb-4`}
      >
        <div className={styles.border}>
          <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
        </div>
        <div className={`${styles.name} text text_type_main-default ml-4`}>{ingredient.name}</div>
        <div className={`${styles.currency} mt-1 mr-4`}>
          <span className='text text_type_digits-default mr-2'>{`${count} x ${ingredient.price}`}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
        className={styles.card}
        key={orderDetails._id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
    >
      <div className={`${styles.title} text text_type_digits-default mb-4`}>{`#${orderDetails.number}`}</div>
      <div className={`${styles.name} text text_type_main-medium mt-10 mb-3`}>{orderDetails.name}</div>
      <div className={`${styles.status} text text_type_main-default mb-15`}>
        {STATUS_TEXT[orderDetails.status]}
      </div>
      <div className='text text_type_main-medium mb-6'>Состав:</div>
      <div className={`${styles.container} mb-10`}>
        {uniqueIngredients.map(renderIngredient)}
      </div>
      <div className={styles.result}>
        <div className={`${styles.date} text text_type_main-default`}>
          <FormattedDate date={new Date(orderDetails.updatedAt ?? orderDetails.createdAt)} />
        </div>
        <div className='text text_type_digits-default mr-2'>{totalPrice}</div>
        <CurrencyIcon type='primary'/>
      </div>
    </motion.div>
  )
}

export default FeedDetails