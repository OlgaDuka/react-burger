import React from 'react'
import styles from './profile.module.css'
import {NavLink, Outlet} from 'react-router-dom'
import {useAppDispatch} from "../../redux";
import {logoutUser} from "../../redux/thunks";
const ProfilePage = () => {
  const dispatch = useAppDispatch()

  const classLink = (isActive: boolean) => {
    return `${styles.link} ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile_menu}>
          <nav className={`${styles.list} text text_type_main-medium text_color_inactive mb-20`}>
            <NavLink to='/profile' className={({isActive}) => classLink(isActive) + ' mb-8'}>
              Профиль
            </NavLink>
            <NavLink to='history-orders' className={({isActive}) => classLink(isActive) + ' mb-8'}>
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
