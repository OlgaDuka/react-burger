import React from 'react'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, Navigate, useNavigate} from 'react-router-dom'

import styles from './pages.module.css'
import {registerUser} from '../utils/api'
import {useForm} from '../hooks/useForm'
import {useSelector} from 'react-redux'

const RegisterPage = () => {
  const isAuthChecked = useSelector(state => state.user.isAuthChecked)
  const navigate = useNavigate()
  const {formValues, handleChange} = useForm({ name: '', email: '', password: '' })

  const register = (e) => {
    e.preventDefault()
    registerUser(formValues)
    navigate('/login')
  }

  if (isAuthChecked) {
    return <Navigate to='/' />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={register} >
          <p className='text text_type_main-medium mb-6'>Регистрация</p>
          <Input
            name='name'
            extraClass='mb-6'
            placeholder='Имя'
            value={formValues?.name || ''}
            type='text'
            onChange={handleChange}
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <span className='mb-4'>Уже зарегистрированы?&nbsp;
          <Link to='/login'>Войти</Link>
        </span>
      </div>
    </div>
  )
}

export default RegisterPage