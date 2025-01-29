import React, {FC} from 'react'
import styles from './profile.module.css'
import {NavLink, Outlet, useMatch} from 'react-router-dom'
import {useAppDispatch} from '../../services'
import {logoutUser} from '../../services/thunks'
const ProfilePage: FC = () => {
  const isOrders = !!useMatch('/profile/orders')
  const isProfile = !!useMatch('/profile')
  const dispatch = useAppDispatch()

  const classLink = (isActive: boolean): string => {
    return `${styles.link} mb-8 ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile_menu}>
          <nav className={`${styles.list} text text_type_main-medium text_color_inactive mb-20`}>
            <NavLink to='/profile' className={() => classLink(isProfile)}>
              Профиль
            </NavLink>
            <NavLink to='orders' className={() => classLink(isOrders)}>
              История заказов
            </NavLink>
            <NavLink to='/login' className={({isActive}) => classLink(isActive)} onClick={() => dispatch(logoutUser())}>
              Выход
            </NavLink>
          </nav>
          <p className='text text_type_main-default text_color_inactive'>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={styles.container}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
