import styles from './blank-constructor.module.css'
import {BlankBurgerProps} from '../../../utils/types'

const BlankConstructor = (props: BlankBurgerProps) => {
  const { position = '', text, isHover } = props
  const classes =
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