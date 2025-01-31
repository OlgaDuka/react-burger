import React, {ReactNode} from 'react'
import {IFeedCardProps as IProps, IIngredientItem} from "../../../utils/types";
import styles from './feed-card.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {RootState, useAppSelector} from "../../../services";
import {Link, useLocation} from "react-router-dom";

const FeedCard = (props: IProps) => {
  const ingredientsAll: IIngredientItem[] = useAppSelector((state: RootState) => state.ingredients.ingredients)
  const { order } = props
  const {
    _id,
    ingredients,
    name,
    number,
    createdAt,
    updatedAt
  } = order
  const location = useLocation()
  let totalPrice = 0
  const countImages = ingredients.length
  const orderIngredients: Array<IIngredientItem | undefined> = ingredients.map((id: string) =>
    ingredientsAll.find((item: IIngredientItem) => item._id === id))

  const renderImages = (): ReactNode =>
    ingredients.map((id: string, index) => {
      const orderIngredient = ingredientsAll.find((item: IIngredientItem) => item._id === id)
      const offset = index * 48
      const z_index = 50 - index
      if (orderIngredients && orderIngredient?.price) {
        totalPrice += orderIngredient?.price
      }

      return orderIngredient && (index < 5
        ? <div className={styles.border} style={{left: `${offset}px`, zIndex: `${z_index}`}}>
          <img
            key={id}
            className={styles.img}
            src={orderIngredient.image}
            alt={orderIngredient.name}
            title={orderIngredient.name}
          />
        </div>
        : <div className={styles.border} style={{left: '240px', zIndex: '45'}}>
            <img
              key={id}
              className={styles.img}
              src={'https://code.s3.yandex.net/react/code/cheese.png'}
              alt={orderIngredient.name}
              title={orderIngredient.name}
            />
            <div className={styles.count}>{`+${countImages - 5}`}</div>
        </div>
      )
    })

  return (
    <Link key={_id} to={`/feed/${number}`} state={{ background: location }} className={styles.link}>
      <div className={styles.container}>
        <div className={`${styles.title_row} mb-6`}>
          <span className='text_type_digits-default'>#{number}</span>
          <span className='text_type_main-default text_color_inactive'>
            <FormattedDate date={new Date(updatedAt ?? createdAt)} />
          </span>
        </div>
        <p className='text_type_main-medium mb-6'>{name}</p>
        <div className={styles.title_row}>
          <div className={styles.img_row}>
            {renderImages()}
          </div>
          <div className={`${styles.currency} mt-1`}>
            <span className='text text_type_digits-default mr-2'>{totalPrice}</span>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FeedCard