import { configureStore } from "@reduxjs/toolkit";
import authSlice from './Slices/AuthSlice'
import cartSlice from './Slices/CartSlice'

const store=configureStore({
    reducer:{
        auth:authSlice,
        cart:cartSlice,
    }
})

export default store