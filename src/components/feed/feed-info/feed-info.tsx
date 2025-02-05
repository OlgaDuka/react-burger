import React from 'react'
import styles from './feed-info.module.css'
import {RootState, useAppSelector} from "../../../services";

const FeedInfo = () => {
  const { total, totalToday, orders } = useAppSelector((state: RootState) => state.ws)
  const ordersDone = orders.filter((item) => item.status === 'done')
  const ordersDone1 = ordersDone.length <= 7 ? ordersDone : ordersDone.slice(0, 7)
  const ordersDone2 = ordersDone.length > 7 ? ordersDone.slice(7, 14) : undefined
  const ordersPending = orders.filter((item) => item.status === 'pending')
  const ordersPending1 = ordersPending.length <= 7 ? ordersPending : ordersPending.slice(0, 7)
  const ordersPending2 = ordersPending.length > 7 ? ordersPending.slice(7, 14) : undefined


  return (
    <section className={`${styles.section} mt-15`}>
      <div className={`${styles.block_list} mb-10`}>

        <div className={styles.part}>
          <div className='text text_type_main-medium mb-6'>Готовы:</div>
          <div className={styles.table_done}>
            <div className={`${styles.column} mb-2`}>
              {ordersDone1 && ordersDone1.map((item) => {
                return <div key={item._id} className='text text_type_digits-default'>{item.number}</div>
              })}
            </div>
            <div className={`${styles.column} mb-2`}>
              {ordersDone2 && ordersDone2.map((item) => {
                return <div key={item._id} className='text text_type_digits-default'>{item.number}</div>
              })}
            </div>
          </div>
        </div>

        <div className={styles.part}>
          <div className='text text_type_main-medium mb-6'>В работе:</div>
          <div className={styles.table}>
            <div className={`${styles.column} mb-2`}>
              {ordersPending1 && ordersPending1.map((item) => {
                return <div key={item._id} className='text text_type_digits-default'>{item.number}</div>
              })}
            </div>
            <div className={`${styles.column} mb-2`}>
              {ordersPending2 && ordersPending2.map((item) => {
                return <div key={item._id} className='text text_type_digits-default'>{item.number}</div>
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='text text_type_main-medium'>Выполнено за все время</div>
      <div className='text text_type_digits-large mb-10'>{total}</div>
      <div className='text text_type_main-medium'>Выполнено за сегодня</div>
      <div className='text text_type_digits-large'>{totalToday}</div>
    </section>
)
}

export default FeedInfo