import React, {useEffect, useState} from 'react'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch, useSelector} from 'react-redux'

import styles from './profile.module.css'
import {updateUser} from '../../services/actions/user'
import {useForm} from '../../hooks/useForm'

const Profile = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [isChange, setIsChange] = useState(false)
  const {formValues, handleChange, setFormValues} = useForm({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    setFormValues(user)
  }, [user, setFormValues])

  const onChange = (e) => {
    handleChange(e)
    setIsChange(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(formValues))
    setIsChange(false)
  }

  const handleCancel = () => {
    setFormValues()
    setIsChange(false)
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          extraClass='mb-6'
          name='name'
          placeholder='Имя'
          value={formValues?.name ?? ''}
          type='text'
          onChange={onChange}
          icon={'EditIcon'}
        />
        <EmailInput
          extraClass='mb-6'
          name='email'
          placeholder='Логин'
          value={formValues?.email ?? ''}
          onChange={onChange}
          icon={'EditIcon'}
          autoComplete='username'
        />
        <PasswordInput
          extraClass='mb-6'
          name='password'
          placeholder="Пароль"
          value={formValues?.password ?? ''}
          onChange={onChange}
          autoComplete='new-password'
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