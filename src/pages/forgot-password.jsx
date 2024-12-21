import React from 'react'
import styles from './pages.module.css'
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {sendEmail} from '../utils/api'
import {useForm} from '../hooks/useForm'
import {useSelector} from 'react-redux'

const ForgotPassword = () => {
  const isAuthChecked = useSelector(state => state.user.isAuthChecked)
  const navigate = useNavigate()
  const {formValues, handleChange} = useForm({ email: '' })

  const reset = (e) => {
    e.preventDefault()
    sendEmail(formValues.email)
    localStorage.setItem('resetPassword', true)
    navigate('/reset-password')
  }

  if (isAuthChecked) {
    return <Navigate to='/' />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={reset}>
          <p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
          <Input
            extraClass='mb-6'
            name='email'
            placeholder='E-mail'
            value={formValues?.email || ''}
            type='email'
            onChange={handleChange}
          />
          <Button type='primary' htmlType='submit' extraClass='mb-20'>
            Восстановить
          </Button>
        </form>
        <span className='mb-4'>Вспомнили пароль?&nbsp;
          <Link to='/login'>Войти</Link>
        </span>
      </div>
    </div>
  )
}

export default ForgotPassword