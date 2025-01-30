import React from 'react'
import {IFeedCardProps as IProps, IIngredientItem} from "../../../utils/types";
import styles from './feed-card.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {RootState, useAppSelector} from "../../../services";

const FeedCard = (props: IProps) => {
  const ingredientsAll: IIngredientItem[] = useAppSelector((state: RootState) => state.ingredients.ingredients)
  const { order } = props
  const {
    ingredients,
    name,
    number,
  } = order

  return (
    <div className={styles.container}>
      <div className={`${styles.title_row} mb-6`}>
        <span className='text_type_digits-default'>#{number}</span>
        <span className='text_type_main-default text_color_inactive'>Сегодня, 16:20</span>
      </div>
      <p className='text_type_main-medium mb-6'>{name}</p>
      <div className={styles.title_row}>
        <div className={styles.img_row}>
          {ingredients.map((id: string) => {
             const imageMini = ingredientsAll.find((item: IIngredientItem) => item._id === id)
             return imageMini && <img key={id} className={styles.img} src={imageMini.image} alt={imageMini.name}/>
          })
          }
        </div>
        <div className={`${styles.currency} mt-1`}>
          <span className='text text_type_digits-default mr-2'>Тут надо посчитать</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}

export default FeedCard