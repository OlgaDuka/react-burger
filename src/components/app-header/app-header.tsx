import React, {FC, useCallback} from 'react'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import MenuItem from './menu-item/menu-item'
import styles from './app-header.module.css'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../services'

const AppHeader: FC = () => {
  const location = useLocation()
  const { isAuthChecked, user } = useAppSelector((state) => state.user)

  // Проверяем, активен ли маршрут или его подпуть (например, /profile/orders)
  const isActive = useCallback(
    (path: string) => {
      if (path === '/profile') {
        return location.pathname.startsWith('/profile')
      }
      return location.pathname === path;
    },
    [location.pathname]
  )

  const getLinkClass = useCallback(
      (path: string) => {
        const baseClass = styles.link
        const activeClass = isActive(path) ? styles.active : ''
        return `${baseClass} ${activeClass}`.trim()
      },
      [isActive]
  )

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <NavLink to='/' className={getLinkClass('/')}>
          <MenuItem
            text='Конструктор'
            icon={<BurgerIcon type="primary" />}
          />
        </NavLink>

        <NavLink to='/feed' className={getLinkClass('/feed')}>
          <MenuItem
            text='Лента заказов'
            icon={<ListIcon type="primary" />}
          />
        </NavLink>

        <Link to='/' className={styles.logo}>
          <Logo />
        </Link>

        <NavLink to='/profile/' className={getLinkClass('/profile') + ` ${styles.last_item}`}>
          <MenuItem
            text={isAuthChecked && user ? user.name : 'Личный кабинет'}
            icon={<ProfileIcon type="primary" />}
          />
        </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader