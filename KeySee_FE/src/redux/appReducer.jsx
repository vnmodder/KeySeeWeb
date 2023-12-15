import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authenticateReducer from 'src/features/authenticate/authenticateSlice'
import informationUserSlice from 'src/features/information-user/informationUserSlice'
import userPermissionSlice from 'src/features/authenticate/userPermissionSlice'
import selectionRowIdSlice from 'src/features/data-grid/selectionRowIdSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['isLoading']
}

const userInformationPersistConfig = {
  key: 'user-information',
  storage,
  blacklist: ['userInformation']
}

const userPermissionPersistConfig = {
  key: 'user-permission-list',
  storage,
  blacklist: ['userPermissionList']
}

const selectionRowIdConfig = {
  key: 'selection-row-id',
  storage,
  blacklist: ['selectionRowId']
}

export default combineReducers({
  authentication: persistReducer(authPersistConfig, authenticateReducer),
  informationUser: persistReducer(userInformationPersistConfig, informationUserSlice),
  userPermissionList: persistReducer(userPermissionPersistConfig, userPermissionSlice),
  selectionRowId : persistReducer(selectionRowIdConfig, selectionRowIdSlice)
})
