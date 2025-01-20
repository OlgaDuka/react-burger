import React from 'react'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import MenuItem from './menu-item/menu-item'
import styles from './app-header.module.css'
import {Link, NavLink} from 'react-router-dom'
import {RootState, useAppSelector} from "../../redux";

const AppHeader = () => {
  const isAuthChecked = useAppSelector((state: RootState) => state.user.isAuthChecked)
  const user = useAppSelector((state: RootState) => state.user.user)
  const classLink = (isActive: boolean) => {
    return `${styles.link} ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
  }

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <NavLink
          to='/'
          className={({isActive}) => classLink(isActive)}
        >
          <MenuItem text='Конструктор'>
            <BurgerIcon type="primary" />
          </MenuItem>
        </NavLink>

        <NavLink
          to='/history-page'
          className={({isActive}) => classLink(isActive)}
        >
          <MenuItem text='Лента заказов'>
            <ListIcon type="secondary" />
          </MenuItem>
        </NavLink>

        <Link to='/' className={styles.logo}>
          <Logo />
        </Link>

        <NavLink
          to='/profile/'
          className={({isActive}) => classLink(isActive) + ` ${styles.last_item}`}
        >
          <MenuItem text={isAuthChecked && user ? user.name : 'Личный кабинет'}>
            <ProfileIcon type="secondary" />
          </MenuItem>
        </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader