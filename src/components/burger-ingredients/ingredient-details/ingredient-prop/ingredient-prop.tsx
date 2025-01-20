import React, {FC} from 'react'

import styles from './ingredient-prop.module.css'
import {IAttributeProps as IProps} from '../../../../utils/types'

const IngredientProp: FC<IProps> = (props: IProps) => {
  const { name, value } = props

  return (
    <div className={styles.info}>
      <p className='text text_type_main-small pb-4'>{name}</p>
      <p className='text text_type_digits-default'>{value}</p>
    </div>
  )
}

export default IngredientProp