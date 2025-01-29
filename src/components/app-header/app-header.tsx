import React, {FC} from 'react'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import MenuItem from './menu-item/menu-item'
import styles from './app-header.module.css'
import {Link, NavLink, useMatch} from 'react-router-dom'
import {RootState, useAppSelector} from '../../services'

const AppHeader: FC = () => {
  const isConstructor = !!useMatch('/')
  const isFeed = !!useMatch('/feed')
  const isProfile = !!useMatch('/profile')
  const isOrders = !!useMatch('/profile/orders')
  const { isAuthChecked, user } = useAppSelector((state: RootState) => state.user)
  const classLink = (isActive: boolean): string => {
    return `${styles.link} ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
  }

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <NavLink
          to='/'
          className={() => classLink(isConstructor)}
        >
          <MenuItem text='Конструктор'>
            <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
          </MenuItem>
        </NavLink>

        <NavLink
          to='/feed'
          className={() => classLink(isFeed)}
        >
          <MenuItem text='Лента заказов'>
            <ListIcon type={isFeed ? 'primary' : 'secondary'} />
          </MenuItem>
        </NavLink>

        <Link to='/' className={styles.logo}>
          <Logo />
        </Link>

        <NavLink
          to='/profile/'
          className={() => classLink(isProfile || isOrders) + ` ${styles.last_item}`}
        >
          <MenuItem text={isAuthChecked && user ? user.name : 'Личный кабинет'}>
            <ProfileIcon type={isProfile || isOrders ? 'primary' : 'secondary'} />
          </MenuItem>
        </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader