import React from 'react'
import {INGREDIENT_PROPS} from '../../../utils/constants'
import IngredientProp from './ingredient-prop/ingredient-prop'
import {IngredientItemType} from '../../../utils/types'

import styles from './ingredient-details.module.css'

const IngredientDetails = ({ item }) => {
  const { name, image, calories, fat, carbohydrates, proteins } = item

  return (
    <div className={styles.card}>
      <img className={`${styles.image} mt-1`} src={image} alt={name}/>
      <p className='text_type_main-medium mt-2 mb-4'>{name}</p>
      <div className={`${styles.prop} mb-5`}>
        <IngredientProp name={INGREDIENT_PROPS.calories} value={calories} />
        <IngredientProp name={INGREDIENT_PROPS.proteins} value={proteins} />
        <IngredientProp name={INGREDIENT_PROPS.fat} value={fat} />
        <IngredientProp name={INGREDIENT_PROPS.carbohydrates} value={carbohydrates} />
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  item: IngredientItemType.isRequired
}

export default IngredientDetails