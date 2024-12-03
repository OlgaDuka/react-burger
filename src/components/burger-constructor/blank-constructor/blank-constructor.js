import PropTypes from 'prop-types'
import styles from './blank-constructor.module.css'

const BlankConstructor = ({ position = '', text, isHover }) => {
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

BlankConstructor.propTypes = {
  position: PropTypes.string,
  text: PropTypes.string
}

export default BlankConstructor