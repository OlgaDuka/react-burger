import React, {FormEvent} from 'react'
import {Link, Navigate, useLocation} from 'react-router-dom'
import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './pages.module.css'
import {useForm} from '../hooks/useForm'
import {RootState, useAppDispatch, useAppSelector} from "../redux";
import {loginUser} from "../redux/thunks";

const LoginPage = () => {
  const location = useLocation()
  const from = location.state?.from || '/'
  const { isAuthChecked, error } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const {formValues, handleChangeInput} = useForm({ email: '', password: '' })

  const login = (e: FormEvent) => {
    e.preventDefault()
    if (formValues) {
      dispatch(loginUser({
        email: formValues.email,
        password: formValues.password
      }))
    }
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
            onChange={handleChangeInput}
            autoComplete='username'
          />
          <PasswordInput
            extraClass='mb-6'
            name='password'
            placeholder="Пароль"
            value={formValues?.password || ''}
            onChange={handleChangeInput}
            autoComplete='current-password'
          />
          {error && error.includes("email or password are incorrect") && (
            <div className={`text text_type_main-default mb-4 ${styles.error}`}>
              Ошибка! Логин или пароль недостоверны!
            </div>
          )}
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