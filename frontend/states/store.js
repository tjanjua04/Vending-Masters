import { configureStore, } from '@reduxjs/toolkit'
import authReducer from './features/userSlice'
import thunk from 'redux-thunk'
import inventoryReducer from './features/inventorySlice'

export const store = configureStore({
  reducer: {
    user:authReducer,
    inventory:inventoryReducer
  },
  middleware:[thunk]
})


