import { createAsyncThunk } from '@reduxjs/toolkit'
import type {} from 'redux-thunk/extend-redux'
import { HTTP_CODES } from 'src/common/constants/constants'
import { ILoginRequest } from './authenticateModels'
import { setCookie } from 'src/common/utils/utils'
import { authenticationService } from 'src/services/authenticate/index'

// Login
export const login = createAsyncThunk(
  'authenticate/login',
  async (param: ILoginRequest, { rejectWithValue }) => {
    try {
      const response = await authenticationService.login(param)

      if (response.status === HTTP_CODES.OK) {
        const { token, expiration } = response?.data?.result
        setCookie(token, expiration)
        return response.data
      }
      return rejectWithValue('Error')
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

// Logout
export const logout = createAsyncThunk(
  'authenticate/logout',
  async (_param, { rejectWithValue }) => {
    try {
      const response = await authenticationService.logout()

      if (response.status === HTTP_CODES.OK) {
        return response.data
      }
      return rejectWithValue('Error')
    } catch (err: any) {
      return rejectWithValue(err.data)
    }
  }
)
