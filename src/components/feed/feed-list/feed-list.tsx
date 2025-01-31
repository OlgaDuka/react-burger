import React from 'react'
import styles from './feed-list.module.css'
import {TOrderItem} from "../../../utils/types";
import FeedCard from "../feed-card/feed-card";
import {RootState, useAppSelector} from "../../../services";

const FeedList = () => {
  const orders: TOrderItem[] = useAppSelector((state: RootState) => state.ws.orders)

  return (
    <section className={`${styles.section}`}>
      <h1 className='text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div className={styles.container}>
        {orders.map((item: TOrderItem) =>
          <div key={item._id} className='mb-4'>
            <FeedCard order={item}/>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeedList