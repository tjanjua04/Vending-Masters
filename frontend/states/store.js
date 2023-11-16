import { configureStore, } from '@reduxjs/toolkit'
import authReducer from './features/userSlice'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    user:authReducer
  },
  middleware:[thunk]
})


