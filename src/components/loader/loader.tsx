import React, {FC} from 'react'
import styles from './loader.module.css'

const Loader: FC = () => {
  return (
    <div className={`${styles.loading} pt-6`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Loader