import { createSlice } from '@reduxjs/toolkit'
import { IUserPermissionList } from './authenticateModels'

const initialState: IUserPermissionList = {
  userPermissions: []
}

export const userPermissionSlice = createSlice({
  name: 'user-permission-list',
  initialState,
  reducers: {
    setUserPermissionState: (state, action) => action.payload
  }
})

export const { setUserPermissionState } = userPermissionSlice.actions

export default userPermissionSlice.reducer
