import React from 'react'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import MenuItem from './menu-item/menu-item'
import styles from './app-header.module.css'

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <MenuItem text={'Конструктор'}>
          <BurgerIcon type="primary" />
        </MenuItem>
        <MenuItem text={'Лента заказов'}>
          <ListIcon type="secondary" />
        </MenuItem>
        <div className={styles.logo}>
          <Logo />
        </div>
        <MenuItem text={'Личный кабинет'}>
          <ProfileIcon type="secondary" />
        </MenuItem>
      </nav>
    </header>
  )
}

export default AppHeader