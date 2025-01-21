import styles from './blank-constructor.module.css'
import {IBlankBurgerProps as IProps} from '../../../utils/types'
import {FC} from 'react'

const BlankConstructor: FC<IProps> = (props: IProps) => {
  const { position = '', text, isHover } = props
  const classes: string =
   `pt-4
   ${styles.blank}
   ${position && styles[`blank_${position}`]}
   ${isHover && styles.hover}`

  return (
    <div className={classes}>
      {text}
    </div>
  )
}

export default BlankConstructor