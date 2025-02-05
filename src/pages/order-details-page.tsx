import React from 'react'
import FeedDetails from "../components/feed/feed-details/feed-details";
import styles from './pages.module.css'

const OrderDetailsPage = () => {
  return (
    <main className={`${styles.main} pt-10`}>
      <FeedDetails />
    </main>
  )
}

export default OrderDetailsPage