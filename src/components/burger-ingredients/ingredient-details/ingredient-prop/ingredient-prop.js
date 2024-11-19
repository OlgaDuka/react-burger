import React from 'react';
import styles from './ingredient-prop.module.css'
const IngredientProp = ({ name, value }) => {
  return (
    <div className={styles.block}>
      <p className='text text_type_main-small pb-4'>{name}</p>
      <p className='text text_type_digits-default'>{value}</p>
    </div>
  );
};

export default IngredientProp;