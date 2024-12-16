import React, {useState} from 'react'
import styles from './pages.module.css'
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from 'react-router-dom'
import {resetPassword} from '../utils/api'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [form, setValue] = useState({ password: '', token: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const reset = (e) => {
    e.preventDefault()
    resetPassword(form.password, form.token)
    navigate('/login')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
          <PasswordInput
            extraClass='mb-6'
            name='password'
            placeholder="Введите новый пароль"
            value={form.password}
            onChange={onChange}
          />
          <Input
            extraClass='mb-6'
            name='token'
            placeholder='Введите код из письма'
            value={form.token}
            type='text'
            onChange={onChange}
          />
          <Button onClick={reset} type='primary' htmlType='submit' extraClass='mb-20'>
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