import React from 'react'
import styles from './pages.module.css'
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from 'react-router-dom'
import {resetPassword} from '../utils/api'
import {useForm} from '../hooks/useForm'

const ResetPassword = () => {
  const navigate = useNavigate()
  const {formValues, handleChange} = useForm({ password: '', token: '' })

  const reset = (e) => {
    e.preventDefault()
    resetPassword(formValues.password, formValues.token)
    localStorage.removeItem('resetPassword')
    navigate('/login')
  }

  if (!localStorage.getItem('resetPassword')) {
    navigate('/login')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={reset}>
          <p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
          <PasswordInput
            extraClass='mb-6'
            name='password'
            placeholder="Введите новый пароль"
            value={formValues?.password || ''}
            onChange={handleChange}
            autoComplete='current-password'
          />
          <Input
            extraClass='mb-6'
            name='token'
            placeholder='Введите код из письма'
            value={formValues?.token || ''}
            type='text'
            onChange={handleChange}
          />
          <Button type='primary' htmlType='submit' extraClass='mb-20'>
            Сохранить
          </Button>
        </form>
        <span className='mb-4'>Вспомнили пароль?&nbsp;
          <Link to='/login'>Войти</Link>
        </span>
      </div>
    </div>
  )
}

export default ResetPassword