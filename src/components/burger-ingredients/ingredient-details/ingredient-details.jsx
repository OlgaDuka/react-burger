import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'

import {INGREDIENT_PROPS} from '../../../utils/constants'
import IngredientProp from './ingredient-prop/ingredient-prop'
import styles from './ingredient-details.module.css'
import {useParams} from 'react-router-dom'

const IngredientDetails = () => {
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const { id } = useParams()

  const ingredient = useMemo(() => {
    return ingredients.find((item) => item._id === id)
  }, [id, ingredients])

  console.log('ingredient: ', ingredient)

  return (
    ingredient
    ? <div className={styles.card}>
        <img className={`${styles.image} mt-1`} src={ingredient.image} alt={ingredient.name}/>
        <p className='text_type_main-medium mt-2 mb-4'>{ingredient.name}</p>
        <div className={`${styles.prop} mb-5`}>
          <IngredientProp name={INGREDIENT_PROPS.calories} value={ingredient.calories} />
          <IngredientProp name={INGREDIENT_PROPS.proteins} value={ingredient.proteins} />
          <IngredientProp name={INGREDIENT_PROPS.fat} value={ingredient.fat} />
          <IngredientProp name={INGREDIENT_PROPS.carbohydrates} value={ingredient.carbohydrates} />
        </div>
      </div>
    : (
      <div>Ингредиент отсутствует</div>
      )
  )
}

export default IngredientDetails