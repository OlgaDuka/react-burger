import React, {FC} from 'react'
import {IModalProps as IProps} from '../../../utils/types'

import styles from './modal-overlay.module.css'

const ModalOverlay: FC<IProps> = (props: IProps) => {
  const { onClose } = props

  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}

export default ModalOverlay