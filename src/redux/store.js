import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./Slices/authSlice"
import navSlice from "./Slices/navSlice"
import postSlice from "./Slices/postSlice"
import orderSlice from "./Slices/orderSlice"

const store=configureStore({
    reducer:{
          "auth":authSlice,
          "nav":navSlice,
          "posts":postSlice,
          "orders":orderSlice
    }
})

export default store