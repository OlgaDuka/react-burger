import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, Navigate, NavigateFunction, useNavigate} from 'react-router-dom'

import styles from './pages.module.css'
import {useForm} from '../hooks/useForm'
import {useAppDispatch, useAppSelector} from '../services'
import {registerUser} from '../services/thunks'
import {ROUTES} from '../utils/constants'

const RegisterPage: FC = () => {
  const { isAuthChecked, error, success } =  useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate: NavigateFunction = useNavigate()
  const [isChange, setIsChange] = useState(false)
  const {formValues, handleChangeInput} = useForm({ name: '', email: '', password: '' })

  useEffect((): void => {
    if (success)
      navigate(ROUTES.LOGIN)
  }, [success, navigate])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleChangeInput(e)
    setIsChange(true)
  }

  const register = (e: FormEvent): void => {
    e.preventDefault()
    if (formValues) {
      dispatch(registerUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      }))
    }
    setIsChange(false)
  }

  if (isAuthChecked) {
    return <Navigate to={ROUTES.HOME} />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={register}>
          <p className='text text_type_main-medium mb-6'>Регистрация</p>
          {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
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
          {!isChange && error && error.includes("User already exists") && (
            <div className={`text text_type_main-default mb-4 ${styles.error}`}>
              Ошибка! Такой пользователь уже есть
            </div>
          )}
          <Button type='primary' htmlType='submit' extraClass='mb-20'>
            Зарегистрироваться
          </Button>
        </form>
        <span className='mb-4'>Уже зарегистрированы?&nbsp;
          <Link to={ROUTES.LOGIN}>Войти</Link>
        </span>
      </div>
    </div>
  )
}

export default RegisterPage
