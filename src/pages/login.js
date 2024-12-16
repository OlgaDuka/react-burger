import React, {useState} from 'react'
import {Link, Navigate, useLocation} from 'react-router-dom'
import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './pages.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {loginUser} from '../services/actions/user'

const LoginPage = () => {
  const { state } = useLocation()
  const isAuthChecked = useSelector(state => state.user.isAuthChecked)
  const dispatch = useDispatch()
  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(form))
  }

  if (isAuthChecked) {
    return <Navigate to={state?.pathname ? state.pathname : '/'} replace />
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
            value={form.email}
            onChange={onChange}
            autoComplete='username'
          />
          <PasswordInput
            extraClass='mb-6'
            name='password'
            placeholder="Пароль"
            value={form.password}
            onChange={onChange}
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