import React, { useState } from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'

import styles from './burger-constructor.module.css'

const BurgerConstructor = (props) => {
  const { data } = props
  const [isOpenModal, setIsOpenModal] = useState(false)
  const outerElement = data.find(item => item.type === 'bun' && item.name === 'Краторная булка N-200i')
  const priceTotal = '610'
  const orderId = '034537'
  const handleOpenOrder = () => {
    setIsOpenModal(true)
  }

  return (
    <section className={`${styles.section} mt-25`}>
      <div>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${outerElement.name} (верх)`}
          price={outerElement.price}
          thumbnail={outerElement.image}
        />
      </div>
      <ul className={styles.container}>
        {
          data.filter(item => item.type !== 'bun').map((item) => (
            <li key={item._id} className={`${styles.item_wrapper} mt-4`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))
        }
      </ul>
      <div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${outerElement.name} (низ)`}
          price={outerElement.price}
          thumbnail={outerElement.image}
        />
      </div>
      <div className={`${styles.total} mt-10 pr-4`}>
        <p className='text text_type_digits-medium mr-4'>{priceTotal}</p>
        <CurrencyIcon className='mr-10' type="primary"/>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenOrder}>
          Оформить заказ
        </Button>
      </div>
      {isOpenModal
      ? <Modal onClose={() => setIsOpenModal(false)}>
          <OrderDetails orderId={orderId} />
        </Modal>
      : null
      }
    </section>
  )
}

export default BurgerConstructor

