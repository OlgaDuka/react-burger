import React from 'react'

import styles from './menu-item.module.css'

const MenuItem = (props) => {
  return (
    <div className={`${styles.item} pt-4 pb-4 pl-5 pr-5`}>
      {props.children}
      <p className={'text text_type_main-default'}>{props.text}</p>
    </div>
  )
}

export default MenuItem
