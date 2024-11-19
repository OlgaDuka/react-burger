import React from 'react'

import styles from './menu-item.module.css'
import PropTypes from 'prop-types'

const MenuItem = (props) => {
  const { text, children } = props

  return (
    <div className={`${styles.item} pt-4 pb-4 pl-5 pr-5`}>
      {children}
      <p className={'text text_type_main-default'}>{text}</p>
    </div>
  )
}

MenuItem.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node
}
export default MenuItem
