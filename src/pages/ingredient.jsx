import React from 'react'
import IngredientDetails from '../components/burger-ingredients/ingredient-details/ingredient-details'
import styles from './pages.module.css'

const IngredientPage = () => {
  return (
    <div>
      <h1 className={`${styles.header} text text_type_main-large mt-8`}>Детали ингредиента</h1>
      <IngredientDetails/>
    </div>
  )
}

export default IngredientPage