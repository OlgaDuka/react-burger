import {useSelector} from 'react-redux'
import {Navigate, useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ element, anonimus = false }) => {
  const isAuthChecked = useSelector(state => state.user.isAuthChecked)
  const location = useLocation()
  const from = location.state?.from || '/'

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonimus && isAuthChecked) {
    return <Navigate to={ from } />
  }
  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonimus && !isAuthChecked) {
    return <Navigate to="/login" state={{ from: location}}/>
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element
}

export default ProtectedRoute

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  anonimus: PropTypes.bool
}