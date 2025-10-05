import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import programReducer from './programSlice'
import cartReducer from './cartSlice'

const store = configureStore({
    reducer : {
        user : userReducer,
        programs : programReducer,
        cart : cartReducer
    }
})

export default store