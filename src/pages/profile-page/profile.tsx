import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './profile.module.css'
import {useForm} from '../../hooks/useForm'
import {RootState, useAppDispatch, useAppSelector} from '../../services'
import {updateUser} from '../../services/thunks'

const Profile = () => {
  const { user, error, success } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const [isChange, setIsChange] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const {formValues, handleChangeInput, setFormValues} = useForm(user)

  useEffect(() => {
    setFormValues(user)
  }, [user, setFormValues])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeInput(e)
    setIsChange(true)
    setShowMessage(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (formValues) {
      dispatch(updateUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      }))
    }
    setIsChange(false)
    setShowMessage(true)
  }

  const handleCancel = () => {
    setFormValues(user)
    setIsChange(false)
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
        <Input
          extraClass='mb-6'
          name='name'
          placeholder='Имя'
          value={formValues?.name ?? ''}
          type='text'
          onChange={handleChange}
          icon='EditIcon'
        />
        <EmailInput
          extraClass='mb-6'
          name='email'
          placeholder='Логин'
          value={formValues?.email ?? ''}
          onChange={handleChange}
          autoComplete='username'
        />
        <PasswordInput
          extraClass='mb-6'
          name='password'
          placeholder="Пароль"
          value={formValues?.password ?? ''}
          onChange={handleChange}
          autoComplete='new-password'
        />
        {!isChange && error && (
          <div className={`text text_type_main-default mb-4 ${styles.error}`}>
            Ошибка! Что-то пошло не так, попробуйте еще раз позже
          </div>
        )}
        {!isChange && !error && success && showMessage && (
          <div className='text text_type_main-default mb-4'>
            Данные успешно изменены
          </div>
        )}
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