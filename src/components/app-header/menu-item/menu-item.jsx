import React from 'react'

import PropTypes from 'prop-types'
import styles from './menu-item.module.css'

const MenuItem = (props) => {
  const { text, children } = props

  return (
    <div className={`${styles.item} pt-4 pb-4 pl-5 pr-5`}>
      {children}
      {text}
    </div>
  )
}

MenuItem.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node
}
export default MenuItem
