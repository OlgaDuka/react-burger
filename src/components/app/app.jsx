import React from 'react'

import AppHeader from '../app-header/app-header'

import {FogotPassword, Home, Ingredient, LoginPage, Page404, ProfilePage, RegisterPage, ResetPassword} from '../../pages'
import {Route, Routes} from 'react-router-dom'
import ProtectedRoute from '../protected-route/protected-route'
import styles from './app.module.css'
import HistoryOrders from '../../pages/profile-page/history-orders'
import Profile from '../../pages/profile-page/profile'

const App = () => {
  return (
    <div className={`${styles.app} pt-10 text_type_main-default`}>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/fogot-password" element={<FogotPassword/>} />
            <Route path="/reset-password" element={<ResetPassword/>} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage/>}/>}>
              <Route path="profile" element={<ProtectedRoute element={<Profile/>}/>} />
              <Route path="history-orders" element={<ProtectedRoute element={<HistoryOrders/>}/>} />
            </Route>
            <Route path="/ingredients/:id" element={<Ingredient/>} />
            <Route path="*" element={<Page404 />} />
          </Routes>
    </div>
  )
}

export default App
