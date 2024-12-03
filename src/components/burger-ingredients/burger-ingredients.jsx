import React, {useRef} from 'react'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {INGREDIENT_TYPES} from '../../utils/constants'
import IngredientCard from './ingredient-card/ingredient-card'

import styles from './burger-ingredients.module.css'
import {useSelector} from 'react-redux'

const BurgerIngredients = () => {
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const [activeTab, setActiveTab] = React.useState('bun')
  const tabsRef = useRef(null)
  const bunsRef = useRef(null)
  const saucesRef = useRef(null)
  const mainsRef = useRef(null)
  const tabs = ['bun', 'sauce', 'main']
  const tabRefs = [ bunsRef, saucesRef, mainsRef]

  function scrollToRef(ref, index) {
    setActiveTab(tabs[index])
    return ref.current.scrollIntoView({behavior: 'smooth'})
  }

  const handlerScroll = () => {
    const tabsPosition = tabsRef.current.getBoundingClientRect().bottom
    let minDistance = window.screen.height
    let tab = ''

    for (let i = 0; i < tabs.length; i++) {
      const distance = Math.abs(tabRefs[i].current.getBoundingClientRect().top - tabsPosition)
      if (distance < minDistance) {
        minDistance = distance
        tab = tabRefs[i].current.getAttribute('data-tab')
      }
    }
    setActiveTab(tab)
  }

  return (
    <section className={`${styles.section}`}>
      <h1 className='text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <div ref={tabsRef} className={`${styles.tabs} mb-10`}>
        {tabs.map((tab, index) =>
            <Tab key={index} value={tab} active={activeTab === tab} onClick={() => scrollToRef(tabRefs[index], index)}>
              {INGREDIENT_TYPES[tab]}
            </Tab>
        )}
      </div>
      <div className={styles.container} onScroll={handlerScroll}>
        {tabs.map((tab, index) =>
          <div key={index} ref={tabRefs[index]} data-tab={tab}>
            <h2 className='text text_type_main-medium'>{INGREDIENT_TYPES[tab]}</h2>
            <ul className={styles.list}>
              {ingredients.map((item) => item.type === tab
                ? <li key={item._id}>
                    <IngredientCard item={item} />
                  </li>
                : null
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default BurgerIngredients