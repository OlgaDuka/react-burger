import React from 'react'
import PropTypes from 'prop-types'

import styles from './ingredient-prop.module.css'

const IngredientProp = ({ name, value }) => {
  return (
    <div className={styles.info}>
      <p className='text text_type_main-small pb-4'>{name}</p>
      <p className='text text_type_digits-default'>{value}</p>
    </div>
  )
}

IngredientProp.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default IngredientProp