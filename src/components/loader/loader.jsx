import React from 'react'
import styles from './loader.module.css'
const Loader = () => {
  return (
    <div className={styles.container}>
      <p className='text text_type_main-medium'>Формируем заказ...</p>
    </div>
  )
}

export default Loader