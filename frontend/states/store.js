import { configureStore, } from '@reduxjs/toolkit'
import authReducer from './features/userSlice'
import thunk from 'redux-thunk'
import inventoryReducer from './features/inventorySlice'
import analyticsReducer from './features/analyticsSlice'
import instructionReducer from './features/instructionsSlice'

export const store = configureStore({
  reducer: {
    user:authReducer,
    inventory:inventoryReducer,
    analytics:analyticsReducer,
    instructions:instructionReducer
  },
  middleware:[thunk]
})


