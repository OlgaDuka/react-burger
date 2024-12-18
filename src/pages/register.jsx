import React, {useState} from 'react'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from 'react-router-dom'

import styles from './pages.module.css'
import {registerUser} from '../utils/api'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    registerUser(form);
    navigate('/login')
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
            value={form.name}
            type='text'
            onChange={onChange}
          />
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