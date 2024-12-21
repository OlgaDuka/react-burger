import React from 'react'
import {Link, Navigate, useLocation} from 'react-router-dom'
import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './pages.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {loginUser} from '../services/actions/user'
import {useForm} from '../hooks/useForm'

const LoginPage = () => {
  const location = useLocation()
  const from = location.state?.from || '/'
  const isAuthChecked = useSelector(state => state.user.isAuthChecked)
  const dispatch = useDispatch()
  const {formValues, handleChange} = useForm({ email: '', password: '' })

  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(formValues))
  }

  if (isAuthChecked) {
    return <Navigate to={ from } />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={login} >
          <p className='text text_type_main-medium mb-6'>Вход</p>
          <EmailInput
            name='email'
            extraClass='mb-6'
            placeholder='E-mail'
            value={formValues?.email || ''}
            onChange={handleChange}
            autoComplete='username'
          />
          <PasswordInput
            extraClass='mb-6'
            name='password'
            placeholder="Пароль"
            value={formValues?.password || ''}
            onChange={handleChange}
            autoComplete='current-password'
          />
          <Button type='primary' htmlType='submit' extraClass='mb-20'>
            Войти
          </Button>
        </form>
        <span className='mb-4'>Вы - новый пользователь?&nbsp;
          <Link to='/register'>Зарегистрироваться</Link>
        </span>
        <span>Забыли пароль?&nbsp;
          <Link to='/fogot-password'>Восстановить пароль</Link>
        </span>
      </div>
    </div>
  )
}

export default LoginPage