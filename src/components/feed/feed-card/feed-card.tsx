import React, {ReactNode} from 'react'
import {IFeedCardProps as IProps, IIngredientItem} from '../../../utils/types'
import styles from './feed-card.module.css'
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components'
import {RootState, useAppSelector} from '../../../services'
import {Link, useLocation} from 'react-router-dom'
import {ORDER_STATUS, STATUS_TEXT} from '../../../utils/constants'

const FeedCard = (props: IProps) => {
  const location = useLocation()
  const isProfile = location.pathname.includes('profile')
  const ingredientsAll = useAppSelector((state: RootState) => state.ingredients.ingredientsMap)
  const { order } = props
  const {
    _id,
    ingredients,
    name,
    number,
    createdAt,
    updatedAt,
    status
  } = order
  let totalPrice = 0
  const countImages = ingredients.length
  const isDone = status === ORDER_STATUS.DONE

  if (!ingredients.length || !number) return null
  const renderImages = (): ReactNode =>
    ingredients.map((item: string, index) => {
      const offset = index * 48
      const z_index = 50 - index
      const orderIngredient: IIngredientItem = ingredientsAll[item]
      if (orderIngredient?.price) {
        totalPrice += orderIngredient?.price
      }

      return orderIngredient && (index < 5
        ? <div key={index} className={styles.border} style={{left: `${offset}px`, zIndex: `${z_index}`}}>
          <img
            className={styles.img}
            src={orderIngredient.image}
            alt={orderIngredient.name}
            title={orderIngredient.name}
          />
        </div>
        : <div key={index} className={styles.border} style={{left: '240px', zIndex: '45'}}>
            <img
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
    <Link
      key={_id}
      to={isProfile ? `/profile/orders/${number}` : `/feed/${number}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div className={styles.container} style={{width: `${isProfile ? '860px' : '584px'}`}}>
        <div className={`${styles.title_row} mb-6`}>
          <span className='text text_type_digits-default'>#{number}</span>
          <span className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={new Date(updatedAt ?? createdAt)}/>
          </span>
        </div>
        <p className='text_type_main-medium mb-2'>{name}</p>
        {isProfile && <p className={`${isDone && styles.status_done} 'text_type_main-default mb-6`}>{STATUS_TEXT[status]}</p>}
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