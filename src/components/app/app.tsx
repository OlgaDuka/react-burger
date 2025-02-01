import React, {FC, useEffect} from 'react'
import AppHeader from '../app-header/app-header'
import {
  FogotPassword,
  FeedPage,
  Home,
  LoginPage,
  Page404,
  ProfilePage,
  RegisterPage,
  ResetPassword
} from '../../pages'
import {NavigateFunction, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import ProtectedRoute from '../protected-route/protected-route'
import styles from './app.module.css'
import Orders from '../../pages/profile-page/orders'
import Profile from '../../pages/profile-page/profile'
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import IngredientPage from '../../pages/ingredient'
import {RootState, useAppDispatch, useAppSelector} from '../../services'
import {setAuthChecked} from '../../services/slices/user'
import {fetchIngredients, getUser} from '../../services/thunks'
import {IIngredientItem} from '../../utils/types'
import {STORAGE_KEY} from '../../utils/constants'
import FeedDetails from "../feed/feed-details/feed-details";

const App: FC = () => {
  const ingredients: IIngredientItem[] = useAppSelector((state: RootState) => state.ingredients.ingredients)
  const isAuthChecked: boolean = useAppSelector((state: RootState) => state.user.isAuthChecked)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate: NavigateFunction = useNavigate()
  const background = location.state && location.state.background
  const token: string | null = localStorage.getItem(STORAGE_KEY.ACCESS)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${styles.app} pt-10 text_type_main-default`}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home/>} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<FeedDetails />} />

        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/fogot-password" element={<FogotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />

        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage/>} />}>
          <Route index element={<ProtectedRoute element={<Profile/>} />} />
          <Route path="profile" element={<ProtectedRoute element={<Profile/>} />} />
          <Route path="orders" element={<ProtectedRoute element={<Orders/>} />} />
          <Route path="orders/:id" element={<ProtectedRoute element={<FeedDetails/>} />} />
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
          <Route path='/feed/:id' element={
            <Modal onClose={() => navigate('/feed')}>
              <FeedDetails />
            </Modal>
          }
          />
          <Route path='/profile/orders/:id' element={
            <Modal onClose={() => navigate('/profile/orders')}>
              <FeedDetails />
            </Modal>
          }
          />
        </Routes>
        )}
    </div>
  )
}
export default App