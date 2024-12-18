import React, {useState} from 'react'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch, useSelector} from 'react-redux'

import styles from './profile.module.css'
import {updateUser} from '../../services/actions/user'

const Profile = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [form, setValue] = useState(user)
  const [isChange, setIsChange] = useState(false)

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    if(form !== user) {
      setIsChange(true)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(form))
    setIsChange(false)
  }

  const handleCancel = () => {
    setValue(user)
    setIsChange(false)
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          extraClass='mb-6'
          name='name'
          placeholder='Имя'
          value={form.name}
          type='text'
          onChange={onChange}
          icon={'EditIcon'}
        />
        <EmailInput
          extraClass='mb-6'
          name='email'
          placeholder='Логин'
          value={form.email}
          onChange={onChange}
          icon={'EditIcon'}
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
        {isChange &&
          <div className={styles.buttons}>
            <Button htmlType='button' type='secondary' onClick={handleCancel}>Отменить</Button>
            <Button htmlType='submit' type='primary'>Сохранить</Button>
          </div>
        }
      </form>

    </div>
  )
}

export default Profile