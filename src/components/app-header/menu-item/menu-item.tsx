import React from 'react'

import styles from './menu-item.module.css'
import {MenuItemProps} from '../../../utils/types'

const MenuItem = (props: MenuItemProps) => {
  const { text, children } = props

  return (
    <div className={`${styles.item} pt-4 pb-4 pl-5 pr-5`}>
      {children}
      <p className={'text text_type_main-default'}>{text}</p>
    </div>
  )
}

export default MenuItem
