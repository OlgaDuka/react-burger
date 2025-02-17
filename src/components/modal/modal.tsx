import React, {FC, useCallback, useEffect} from 'react'
import * as ReactDom from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import ModalOverlay from './modal-overlay/modal-overlay'
import styles from './modal.module.css'
import {IModalProps as IProps} from '../../utils/types'

const modalRoot: any = document.getElementById('modal-root')

const Modal: FC<IProps> = (props: IProps) => {
  const { children, onClose, header = null} = props

  const handleEscapePress = useCallback((event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleEscapePress)

    return (): void => {
      window.removeEventListener('keydown', handleEscapePress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ReactDom.createPortal (
      <>
        <div data-testid='modal' className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={`${styles.header} text text_type_main-large`}>
            {header && <div>{header}</div>}
            <div data-testid='modal-close' className={styles.close}>
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