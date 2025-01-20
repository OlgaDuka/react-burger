import React, {FC, FormEvent} from 'react'
import styles from './pages.module.css'
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, NavigateFunction, useNavigate} from 'react-router-dom'
import {resetPassword} from '../utils/api'
import {useForm} from '../hooks/useForm'
import {ROUTES, STORAGE_KEY} from "../utils/constants";

const ResetPassword: FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const {formValues, handleChangeInput} = useForm({ password: '', token: '' })

  const reset = (e: FormEvent): void => {
    e.preventDefault()
    if (formValues) {
      resetPassword({
        password: formValues.password,
        token: formValues.token
      })
      localStorage.removeItem(STORAGE_KEY.RESET_PASSWORD)
      navigate(ROUTES.LOGIN)
    }
  }

  if (!localStorage.getItem(STORAGE_KEY.RESET_PASSWORD)) {
    navigate(ROUTES.LOGIN)
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
            onChange={handleChangeInput}
            autoComplete='current-password'
          />
          {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
          <Input
            extraClass='mb-6'
            name='token'
            placeholder='Введите код из письма'
            value={formValues?.token || ''}
            type='text'
            onChange={handleChangeInput}
          />
          <Button type='primary' htmlType='submit' extraClass='mb-20'>
            Сохранить
          </Button>
        </form>
        <span className='mb-4'>Вспомнили пароль?&nbsp;
          <Link to={ROUTES.LOGIN}>Войти</Link>
        </span>
      </div>
    </div>
  )
}

export default ResetPassword