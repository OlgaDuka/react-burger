import React from 'react'
import styles from './feed-list.module.css'
import {TOrderItem} from '../../../utils/types'
import FeedCard from '../feed-card/feed-card'
import {useAppSelector} from '../../../services'
import {useLocation} from 'react-router-dom'
import { motion } from 'framer-motion'

const FeedList = () => {
  const location = useLocation()
  const isProfile = location.pathname.includes('profile')
  const orders: TOrderItem[] = useAppSelector((state) =>
    isProfile ? state.wsUser.orders : state.ws.orders)

  return (
    <section className={`${styles.section} mt-6`}>
      {!isProfile && <h1 className='text_type_main-large mt-10 mb-5'>Лента заказов</h1>}
      <div className={`${styles.container} ${isProfile ? styles.profile_height : styles.feed_height}`}>
        {orders.map((item: TOrderItem) =>
          <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='mb-4'
          >
            <FeedCard order={item}/>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default FeedList