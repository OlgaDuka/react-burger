import React, {FC} from 'react'

import styles from './menu-item.module.css'
import {IMenuItemProps as IProps} from '../../../utils/types'

const MenuItem: FC<IProps> = (props: IProps) => {
  const { text, icon } = props

  return (
    <div className={`${styles.item} pt-4 pb-4 pl-5 pr-5`}>
        {icon && (
            <div className={`${styles.icon} mr-2`} style={{ display: 'flex', alignItems: 'center' }}>
                {icon}
            </div>
        )}
      <p className={'text text_type_main-default'}>{text}</p>
    </div>
  )
}

export default MenuItem
