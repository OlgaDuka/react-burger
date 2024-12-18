import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ element }) => {
  const isAuthChecked = useSelector(state => state.user.isAuthChecked)

  return isAuthChecked ? element : <Navigate to="/login" replace/>;
}

export default ProtectedRoute

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired
}