import React, {useCallback, useEffect} from 'react'
import * as ReactDom from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'

const modalRoot = document.getElementById('modal-root')

const Modal = (props) => {
  const { children, onClose, header = ''} = props

  const handleEscapePress = useCallback((event) => {
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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
}
export default Modal