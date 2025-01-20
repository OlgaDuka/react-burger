import React, {FC, useEffect} from 'react'
import AppHeader from '../app-header/app-header'
import {
  FogotPassword,
  HistoryPage,
  Home,
  LoginPage,
  Page404,
  ProfilePage,
  RegisterPage,
  ResetPassword
} from '../../pages'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import ProtectedRoute from '../protected-route/protected-route'
import styles from './app.module.css'
import HistoryOrders from '../../pages/profile-page/history-orders'
import Profile from '../../pages/profile-page/profile'
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import IngredientPage from '../../pages/ingredient'
import {RootState, useAppDispatch, useAppSelector} from "../../redux";
import {setAuthChecked} from "../../redux/slices/user";
import {fetchIngredients, getUser} from "../../redux/thunks";
import {IngredientItem} from "../../utils/types";
import {STORAGE_KEY} from "../../utils/constants";

const App: FC = () => {
  const ingredients: IngredientItem[] = useAppSelector((state: RootState) => state.ingredients.ingredients)
  const isAuthChecked: boolean = useAppSelector((state: RootState) => state.user.isAuthChecked)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background
  const token = localStorage.getItem(STORAGE_KEY.ACCESS)

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients())
    }
  }, [ingredients.length, dispatch])

  useEffect(() => {
    if (!isAuthChecked && token) {
      dispatch(getUser())
      dispatch(setAuthChecked(true))
    }
  }, [])

  return (
    <div className={`${styles.app} pt-10 text_type_main-default`}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home/>} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/history-page" element={<HistoryPage />} />

        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/fogot-password" element={<FogotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />

        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage/>} />}>
          <Route index element={<ProtectedRoute element={<Profile/>} />} />
          <Route path="profile" element={<ProtectedRoute element={<Profile/>} />} />
          <Route path="history-orders" element={<ProtectedRoute element={<HistoryOrders/>} />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={
            <Modal onClose={() => navigate('/')} header='Детали ингредиента'>
              <IngredientDetails />
            </Modal>
            }
          />
        </Routes>
        )}
    </div>
  )
}
export default App