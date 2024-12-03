import React from 'react'
import {useSelector} from 'react-redux'

import {INGREDIENT_PROPS} from '../../../utils/constants'
import IngredientProp from './ingredient-prop/ingredient-prop'
import styles from './ingredient-details.module.css'

const IngredientDetails = () => {
  const selectedIngredient = useSelector(state => state.details.selectedIngredient)
  const { name, image, calories, fat, carbohydrates, proteins } = selectedIngredient

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

export default IngredientDetails