import {Navigate, useLocation} from 'react-router-dom'
import {ProtectedRouteProps} from '../../utils/types'
import {RootState, useAppSelector} from '../../services'
import {FC, ReactElement} from 'react'

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element, anonimus = false }): ReactElement => {
  const isAuthChecked = useAppSelector((state: RootState) => state.user.isAuthChecked)
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
