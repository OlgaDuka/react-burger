import React from 'react';
import PropTypes from 'prop-types'
import {useDrag} from 'react-dnd'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {IngredientItemType} from '../../../utils/types'
import styles from './ingredient-card.module.css'
import {Link, useLocation} from 'react-router-dom'

const IngredientCard = ({ item }) => {
  const location = useLocation()
  const { image, name, price, count, _id } = item

  const [{ opacity }, dragRef] = useDrag({
    type: item.type === 'bun' ? 'bun' : 'ingredients',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <Link key={_id} to={`/ingredients/${_id}`} state={{ background: location }} className={styles.link}>
      <div ref={dragRef} className={`${styles.card} mt-6 mb-8`} style={{ opacity }}>
        <img className='mt-1' src={image} alt={name}/>
        {!!count && <Counter count={count} size="default" extraClass="m-1" />}
        <div className={`${styles.currency} mt-1`}>
          <span className='text text_type_digits-default mr-2'>{price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <p className='text_type_main-default mt-2 mb-2'>{name}</p>
      </div>
    </Link>
  )
}

IngredientCard.propTypes = {
  item: IngredientItemType.isRequired,
  hasCount: PropTypes.bool
}

export default IngredientCard
