import {useCallback, useState} from 'react'

export const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const openModal = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpenModal(false)
}, [])

  return { isOpenModal, openModal, closeModal }
}