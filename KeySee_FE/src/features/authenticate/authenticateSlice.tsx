import { createSlice } from '@reduxjs/toolkit'
import { ILoginResponse } from 'src/features/authenticate/authenticateModels'

import { login, logout } from './authenticateActions'

interface IAuthenticatesState {
  authentication: ILoginResponse | null
  departments?: string[]
  isLoading: boolean
  isSendSuccess: boolean
}

const initialState: IAuthenticatesState = {
  authentication: null,
  isLoading: false,
  isSendSuccess: false
}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticateState: (state, action) => {
      state.authentication = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        delete action.payload.token

        state.isLoading = false
        state.authentication = action.payload
        state.departments = state?.authentication?.departments ?? []
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const { setAuthenticateState } = authenticationSlice.actions

export default authenticationSlice.reducer
