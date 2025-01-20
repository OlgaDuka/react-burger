import {createSlice} from '@reduxjs/toolkit'
import {UserState} from '../types'
import {getUser, loginUser, logoutUser, registerUser, updateUser} from '../thunks'

const initialState: UserState = {
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
    setAuthChecked: (state: UserState, action: { payload: boolean }) => {
      state.isAuthChecked = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state: UserState) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(getUser.fulfilled, (state: UserState, { payload }) => {
        state.loading = false
        state.success = true
        state.user = payload.user
        state.isAuthChecked = true
        state.error = null
      })
      .addCase(getUser.rejected, (state: UserState, action) => {
        state.loading = false
        state.isAuthChecked = false
        state.success = false
        state.error = String(action.error.message)
      })
      .addCase(updateUser.pending, (state: UserState) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state: UserState, { payload }) => {
        state.loading = false
        state.success = true
        state.user = payload.user
        state.error = null
      })
      .addCase(updateUser.rejected, (state: UserState, action) => {
        state.loading = false
        state.success = false
        state.error = String(action.error.message)
      })
      .addCase(loginUser.pending, (state: UserState) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state: UserState, { payload }) => {
        state.loading = false
        state.success = true
        state.user = payload
        state.isAuthChecked = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state: UserState, action) => {
        state.user = null
        state.loading = false
        state.isAuthChecked = false
        state.success = false
        state.error = String(action.error.message)
      })
      .addCase(logoutUser.pending, (state: UserState) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state: UserState) => {
        state.loading = false
        state.user = null
        state.isAuthChecked = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state: UserState, action) => {
        state.loading = false
        state.success = false
        state.error = String(action.error.message)
      })
      .addCase(registerUser.pending, (state: UserState) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state: UserState, { payload }) => {
        state.loading = false
        state.success = true
        state.user = payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state: UserState, action) => {
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



