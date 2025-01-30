import React from 'react'
import styles from './feed-info.module.css'

const FeedInfo = () => {
  return (
    <section className={`${styles.section} mt-25`}>
      <div>
        <span className='text text_type_main-medium mr-4'>Готовы:</span>
        <span className='text text_type_main-medium mr-4'>В работе:</span>
      </div>
    </section>
  )
}

export default FeedInfo