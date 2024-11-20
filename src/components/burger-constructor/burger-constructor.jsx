import React from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import {useModal} from '../hooks/useModal'
import {IngredientItemType} from '../../utils/types'

import styles from './burger-constructor.module.css'

const BurgerConstructor = (props) => {
  const { data } = props
  const { isOpenModal, openModal, closeModal } = useModal()
  const outerElement = data.find(item => item.type === 'bun' && item.name === 'Краторная булка N-200i')
  const priceTotal = '610'
  const orderId = '034537'

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
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isOpenModal
      ? <Modal onClose={closeModal}>
          <OrderDetails orderId={orderId} />
        </Modal>
      : null
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(IngredientItemType).isRequired
}

export default BurgerConstructor

