import React, {FormEvent} from 'react'
import styles from './pages.module.css'
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, Navigate, NavigateFunction, useNavigate} from 'react-router-dom'
import {sendEmail} from '../utils/api'
import {useForm} from '../hooks/useForm'
import {RootState, useAppSelector} from '../services'

const ForgotPassword = () => {
  const isAuthChecked = useAppSelector((state: RootState) => state.user.isAuthChecked)
  const navigate: NavigateFunction = useNavigate()
  const {formValues, handleChangeInput} = useForm({ email: '' })

  const reset = (e: FormEvent) => {
    e.preventDefault()
    if (formValues) {
      sendEmail({email: formValues.email})
      localStorage.setItem('resetPassword', 'true')
      navigate('/reset-password')
    }
  }

  if (isAuthChecked) {
    return <Navigate to='/' />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={reset}>
          <p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
          {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
          <Input
            extraClass='mb-6'
            name='email'
            placeholder='E-mail'
            value={formValues?.email || ''}
            type='email'
            onChange={handleChangeInput}
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