import React, {useState} from 'react'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch, useSelector} from 'react-redux'

import styles from './profile.module.css'
import {updateUser} from '../../services/actions/user'

const Profile = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState(user?.password || '')
  const [isChange, setIsChange] = useState(false)

  console.log(isChange)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser({ name, email, password }))
    setIsChange(false)
  }

  const handleCancel = () => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setPassword(user?.password || '')
    setIsChange(false)
  }

  return (
    <div>
      <form className={styles.form} onClick={handleSubmit}>
        <Input
          extraClass='mb-6'
          placeholder='Имя'
          value={name}
          type='text'
          onChange={(e) => {
            if (name !== e.target.value) {
              setName(e.target.value)
              setIsChange(true)
            }}
          }
          icon={'EditIcon'}
        />
        <EmailInput
          extraClass='mb-6'
          placeholder='Логин'
          value={email}
          onChange={(e) => {
            if (email !== e.target.value) {
              setEmail(e.target.value)
              setIsChange(true)
            }}
          }
          icon={'EditIcon'}
        />
        <PasswordInput
          extraClass='mb-6'
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            if (password !== e.target.value) {
              setPassword(e.target.value)
              setIsChange(true)
            }}
          }
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