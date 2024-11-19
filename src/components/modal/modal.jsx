import React, {useEffect} from 'react'
import * as ReactDom from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './modal.module.css'

const modalRoot = document.getElementById('modal-root')

const Modal = (props) => {
  const { children, onClose, header = ''} = props

  useEffect(() => {
    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    };

    document.body.classList.add('open')
    window.addEventListener('keydown', handleEscapePress)

    return () => {
      document.body.classList.remove('open')
      window.removeEventListener('keydown', handleEscapePress)
    };
  }, [onClose])

  return ReactDom.createPortal (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={`${styles.header} text text_type_main-large`}>
            <div>{header}</div>
            <div className={styles.close}>
              <CloseIcon type="primary" onClick={onClose}/>
            </div>
          </div>
          {children}
        </div>
      </div>,
    modalRoot
  )
}

export default Modal