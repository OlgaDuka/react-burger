import {createSlice} from '@reduxjs/toolkit'
import {IUserState} from '../types/state-types'
import {getUser, loginUser, logoutUser, registerUser, updateUser} from '../thunks'

const initialState: IUserState = {
  user: null,
  success: false,
  isAuthChecked: false,
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state: IUserState, action: { payload: boolean }) => {
      state.isAuthChecked = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state: IUserState) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(getUser.fulfilled, (state: IUserState, { payload }) => {
        state.loading = false
        state.success = true
        state.user = payload.user
        state.isAuthChecked = true
        state.error = null
      })
      .addCase(getUser.rejected, (state: IUserState, action) => {
        state.loading = false
        state.isAuthChecked = false
        state.success = false
        state.error = String(action.error.message)
      })
      .addCase(updateUser.pending, (state: IUserState) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state: IUserState, { payload }) => {
        state.loading = false
        state.isAuthChecked = true
        state.success = true
        state.user = payload.user
        state.error = null
      })
      .addCase(updateUser.rejected, (state: IUserState, action) => {
        state.loading = false
        state.success = false
        state.error = String(action.error.message)
      })
      .addCase(loginUser.pending, (state: IUserState) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state: IUserState, { payload }) => {
        state.loading = false
        state.success = true
        state.user = payload
        state.isAuthChecked = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state: IUserState, action) => {
        state.user = null
        state.loading = false
        state.isAuthChecked = false
        state.success = false
        state.error = String(action.error.message)
      })
      .addCase(logoutUser.pending, (state: IUserState) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state: IUserState) => {
        state.loading = false
        state.success = true
        state.user = null
        state.isAuthChecked = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state: IUserState, action) => {
        state.loading = false
        state.success = false
        state.error = String(action.error.message)
      })
      .addCase(registerUser.pending, (state: IUserState) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state: IUserState, { payload }) => {
        state.loading = false
        state.success = true
        state.user = payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state: IUserState, action) => {
        state.loading = false
        state.success = false
        state.error = String(action.error.message)
      })
  }
})

export const {
  setAuthChecked
} = userSlice.actions
export default userSlice.reducer



