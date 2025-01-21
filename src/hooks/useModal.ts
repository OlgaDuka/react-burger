import {useCallback, useState} from 'react'

interface IModal {
  isOpenModal: boolean
  openModal: () => void
  closeModal: () => void
}

export const useModal = (): IModal => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = useCallback((): void => {
    setIsOpenModal(true)
  }, [])

  const closeModal = useCallback((): void => {
    setIsOpenModal(false)
}, [])

  return { isOpenModal, openModal, closeModal }
}