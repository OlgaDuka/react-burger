import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css'
import {INGREDIENT_TYPES} from "../../utils/constants";
import IngredientCard from "./ingredient-card/ingredient-card";

const BurgerIngredients = (props) => {
  const { data } = props
  const [currentTab, setCurrentTab] = React.useState('bun')

  return (
    <section className={`${styles.section}`}>
      <h1 className='text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>{INGREDIENT_TYPES.bun}</Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>{INGREDIENT_TYPES.sauce}</Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>{INGREDIENT_TYPES.main}</Tab>
      </div>
      <div className={styles.container}>
        <h2 className='text text_type_main-medium'>{INGREDIENT_TYPES[currentTab]}</h2>
        <ul className={styles.list}>
          {data.map((item) => item.type === currentTab
            ? <li key={item._id}>
              <IngredientCard
                item={item}
                hasCount={currentTab === 'bun' && item.name === 'Краторная булка N-200i'}
              />
            </li>
            : null
          )}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;