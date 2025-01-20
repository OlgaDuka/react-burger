import React, {useCallback, useEffect} from 'react'
import * as ReactDom from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import ModalOverlay from './modal-overlay/modal-overlay'
import styles from './modal.module.css'
import {ModalProps} from '../../utils/types'

const modalRoot: any = document.getElementById('modal-root')

const Modal = (props: ModalProps) => {
  const { children, onClose, header = ''} = props

  const handleEscapePress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleEscapePress)

    return () => {
      window.removeEventListener('keydown', handleEscapePress)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ReactDom.createPortal (
      <>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={`${styles.header} text text_type_main-large`}>
            <div>{header}</div>
            <div className={styles.close}>
              <CloseIcon type="primary" onClick={onClose}/>
            </div>
          </div>
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </>,
    modalRoot
  )
}
export default Modal