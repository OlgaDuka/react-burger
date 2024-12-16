import React, {useState} from 'react'
import styles from './pages.module.css'
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from 'react-router-dom'
import {sendEmail} from '../utils/api'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [form, setValue] = useState({ email: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const reset = (e) => {
    e.preventDefault()
    sendEmail(form.email)
    navigate('/reset-password')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
          <Input
            extraClass='mb-6'
            name='email'
            placeholder='E-mail'
            value={form.email}
            type='email'
            onChange={onChange}
          />
          <Button onClick={reset} type='primary' htmlType='submit' extraClass='mb-20'>
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