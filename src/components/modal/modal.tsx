import React, {FC, useCallback, useEffect, useState} from 'react'
import * as ReactDom from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import ModalOverlay from './modal-overlay/modal-overlay'
import styles from './modal.module.css'
import {IModalProps as IProps} from '../../utils/types'
import {AnimatePresence, motion} from "framer-motion";

const modalRoot: any = document.getElementById('modal-root')

const Modal: FC<IProps> = (props: IProps) => {
  const { children, onClose, header = null} = props
  const [isVisible, setIsVisible] = useState(true); // Управляем видимостью для анимации

  const handleEscapePress = useCallback((event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
        setIsVisible(false)
    }
  }, [])

  const handleClose = () => {
      setIsVisible(false);
  };

  const handleAnimationComplete = useCallback(() => {
     // Только после завершения анимации вызываем внешний onClose
        onClose();
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleEscapePress)

    return (): void => {
      window.removeEventListener('keydown', handleEscapePress)
    }
  }, [handleEscapePress])

  if (!modalRoot) return null

  return ReactDom.createPortal (
      <AnimatePresence onExitComplete={handleAnimationComplete}>
        { isVisible && (
            <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1000,
                  padding: '20px'
                }}
            >
              <ModalOverlay onClose={handleClose} />
              <motion.div
                  key="modal"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  className={styles.modal}
                  onClick={(e) => e.stopPropagation()}
              >
                <div className={`${styles.header} text text_type_main-large`}>
                  {header && <div>{header}</div>}
                  <div data-testid="modal-close" className={styles.close}>
                    <CloseIcon type="primary" onClick={handleClose} />
                  </div>
                </div>
                {children}
              </motion.div>
            </div>
        )}
      </AnimatePresence>,
    modalRoot
  )
}
export default Modal