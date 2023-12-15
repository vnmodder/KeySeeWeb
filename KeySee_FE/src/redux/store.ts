import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import appReducer from './appReducer'
import { __DEV__ } from 'src/common/utils/isEnv'

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: true,
      serializableCheck: false
    })
  ],
  devTools: __DEV__
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
