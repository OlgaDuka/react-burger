import React, {FC, RefObject, useRef, useState} from 'react'

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {INGREDIENT_TYPES} from '../../utils/constants'
import IngredientCard from './ingredient-card/ingredient-card'
import styles from './burger-ingredients.module.css'
import {RootState, useAppSelector} from '../../services'
import {IIngredientItem} from '../../utils/types'

const BurgerIngredients: FC = () => {
  const ingredients = useAppSelector((state: RootState) => state.ingredients.ingredients)
  const [activeTab, setActiveTab] = useState('bun')
  const tabsRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const bunsRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const saucesRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const mainsRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const tabs: string[] = ['bun', 'sauce', 'main']
  const tabRefs: RefObject<HTMLDivElement>[] = [ bunsRef, saucesRef, mainsRef]

  function scrollToRef(ref: any, index: number) {
    setActiveTab(tabs[index])
    return ref.current.scrollIntoView({behavior: 'smooth'})
  }

  const handlerScroll = (): void => {
    const tabsPosition: number = tabsRef.current?.getBoundingClientRect().bottom || 0
    let minDistance: number = window.screen.height
    let tab: string = ''

    for (let i: number = 0; i < tabs.length; i++) {
      const distance: number = Math.abs((tabRefs[i].current?.getBoundingClientRect().top || 0) - tabsPosition)
      if (distance < minDistance) {
        minDistance = distance
        tab = tabRefs[i].current?.getAttribute('data-tab') || ''
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
              {INGREDIENT_TYPES[index]}
            </Tab>
        )}
      </div>
      <div className={styles.container} onScroll={handlerScroll}>
        {tabs.map((tab, index) =>
          <div key={index} ref={tabRefs[index]} data-tab={tab}>
            <h2 className='text text_type_main-medium'>{INGREDIENT_TYPES[index]}</h2>
            <ul className={styles.list}>
              {ingredients.map((item: IIngredientItem) => item.type === tab
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