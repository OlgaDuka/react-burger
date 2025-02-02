import React, {ReactNode} from 'react'
import {TOrder} from "../../../utils/types";
import {RootState, useAppSelector} from "../../../services";
import {useParams} from "react-router-dom";
import styles from './feed-details.module.css'
import {STATUS_TEXT} from "../../../utils/constants";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

const FeedDetails = () => {
  const ingredientsAll = useAppSelector((state: RootState) => state.ingredients.ingredientsMap)
  const ordersMap: TOrder = useAppSelector((state: RootState) => state.ws.ordersMap)
  const { id } = useParams()
  const order = id && ordersMap[id]

  if (!order) return null

  const { ingredients, } = order
  const unical_list = ingredients.reduce((acc: Record<string, number>, currentValue) => ({
    ...acc,
    [currentValue]: (acc[currentValue] || 0) + 1
  }), {})
  const unical_arr = Object.entries(unical_list)
  const totalPrice = unical_arr.reduce((acc, currentValue) => {
    const ingredient = ingredientsAll[currentValue[0]]
    return acc + ingredient.price * currentValue[1]
  }, 0)

  const renderIngredient = (item: [string, number]): ReactNode => {
    const ingredient = ingredientsAll[item[0]]

    return (
      <div key={item[0]} className={`${styles.info} mb-4`}>
        <div className={styles.border}>
          <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
        </div>
        <div className={`${styles.name} text text_type_main-default ml-4`}>{ingredient.name}</div>
        <div className={`${styles.currency} mt-1 mr-4`}>
          <span className='text text_type_digits-default mr-2'>{`${item[1]} x ${ingredient.price}`}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    )
  }

  return (
    order
      ? <div className={styles.card}>
        <div className={`${styles.title} text text_type_digits-default mb-10`}>{`#${order.number}`}</div>
        <div className='text text_type_main-medium mt-10 mb-3'>{order.name}</div>
        <div className={`${styles.status} text text_type_main-default mb-15`}>
          {STATUS_TEXT[order.status]}
        </div>
        <div className='text text_type_main-medium mb-6'>Состав:</div>
        <div className={`${styles.container} mb-10`}>
          {unical_arr.map((item) => renderIngredient(item))}
        </div>
        <div className={styles.result}>
          <div className={`${styles.date} text text_type_main-default`}>
            <FormattedDate date={new Date(order.updatedAt ?? order.createdAt)} />
          </div>
          <div className='text text_type_digits-default mr-2'>{totalPrice}</div>
          <CurrencyIcon type='primary'/>
        </div>
      </div>
      : (
        <div>Заказ не найден</div>
      )
  )
}

export default FeedDetails