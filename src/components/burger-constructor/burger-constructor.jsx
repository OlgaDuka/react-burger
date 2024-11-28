import React from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import {useModal} from '../../hooks/useModal'

import styles from './burger-constructor.module.css'
import {useSelector} from 'react-redux'
import BlankConstructor from './blank-constructor/blank-constructor'

const BurgerConstructor = () => {
  const bun = useSelector(state => state.burgerConstructor.bun)
  const ingredients = useSelector(state => state.burgerConstructor.ingredients)
  const { isOpenModal, openModal, closeModal } = useModal()
  const priceTotal = '610'

  return (
    <section className={`${styles.section} mt-25`}>
      <div>
        {bun
        ? <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        : <BlankConstructor position='top' text='Выберите булки' />
        }
      </div>
      {
      <ul className={styles.container}>
        {ingredients && ingredients.length
          ? ingredients.filter(item => item.type !== 'bun').map((item) => (
            <li key={item._id} className={`${styles.item_wrapper} mt-4`}>
              <DragIcon type="primary"/>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))
          : <li key={1} className={`${styles.item_wrapper} mt-4 mb-4`}>
            <BlankConstructor text='Выберите начинку' />
          </li>

        }
      </ul>
      }
      <div>
        {bun
          ? <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
          : <BlankConstructor position='bottom' text='Выберите булки' />
        }
      </div>
      <div className={`${styles.total} mt-10 pr-4`}>
        <p className='text text_type_digits-medium mr-4'>{priceTotal}</p>
        <CurrencyIcon className='mr-10' type="primary"/>
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isOpenModal
      ? <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      : null
      }
    </section>
  )
}

export default BurgerConstructor

