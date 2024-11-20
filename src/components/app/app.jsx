import React, {useEffect, useState} from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './app.module.css'
import {URL_GALAXY} from '../../utils/constants'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    setIsLoading(true)
    fetch(URL_GALAXY)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .then(res => {
        setIngredients(res.data)
      })
      .catch(() => {
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className={`${styles.app} pt-10 text_type_main-default`}>
      <AppHeader />
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading && !hasError && ingredients.length &&
      <main className={styles.main}>
        <BurgerIngredients data={ingredients} />
        <BurgerConstructor data={ingredients} />
      </main>
      }
    </div>
  )
}

export default App
