import React from 'react'
import {ModalProps} from '../../../utils/types'

import styles from './modal-overlay.module.css'

const ModalOverlay = (props: ModalProps) => {
  const { onClose } = props

  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}

export default ModalOverlay