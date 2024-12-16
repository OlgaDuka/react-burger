import React, {useEffect} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import styles from './pages.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {getIngredients} from '../services/actions/ingredients'

const Home = () => {
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const dispatch = useDispatch()

  useEffect(() => {
    const controller = new AbortController()
    if (ingredients.length === 0) {
      dispatch(getIngredients())
    }

    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  )
}

export default Home