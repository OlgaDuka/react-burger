import React from 'react'
import styles from './feed-list.module.css'
import {TOrderItem} from "../../../utils/types";
import FeedCard from "../feed-card/feed-card";

const orders: TOrderItem[] = [
  {
    _id: '70666c42cc7b410027a1a9b0',
    ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942'
    ],
    name: 'Space флюоресцентный бургер',
    number: 123123,
    status: 'done',
    createdAt: '2021-06-23T14:43:22.587Z',
    updatedAt: '2021-06-23T14:43:22.603Z'
  },
  {
    _id: '70666rr2cc7b410027a1a9b0',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0948',
    ],
    name: 'Еще один обычный бургер',
    number: 163128,
    status: 'done',
    createdAt: '2021-06-23T14:43:22.587Z',
    updatedAt: '2021-06-23T14:43:22.603Z'
  },
  {
    _id: '70666rr2cc7b410027a1a9b0',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0944'
    ],
    name: 'Бургер астероидный',
    number: 363128,
    status: 'done',
    createdAt: '2021-06-23T14:43:22.587Z',
    updatedAt: '2021-06-23T14:43:22.603Z'
  },
  {
    _id: '70666rr2cc7b410027a1a9b0',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa0949'
    ],
    name: 'Любительский бургер',
    number: 763128,
    status: 'done',
    createdAt: '2021-06-23T14:43:22.587Z',
    updatedAt: '2021-06-23T14:43:22.603Z'
  }
]

const FeedList = () => {
  return (
    <section className={`${styles.section}`}>
      <h1 className='text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div className={styles.container}>
        {orders.map((item: TOrderItem) =>
          <div key={item._id} className='mb-4'>
            <FeedCard order={item}/>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeedList