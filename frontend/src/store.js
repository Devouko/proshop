import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import cartSliceReducer from "./slices/cartSlice.js"

const store=configureStore({
    //containing the logic for updating the cached data
    reducer: {[apiSlice.reducerPath]:apiSlice.reducer,  cart: cartSliceReducer  },

    //A custom Redux middleware that contains logic for managing caching, invalidation, subscriptions, polling, and more. Add this to the store setup after other middleware.
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    //If this is a boolean, it will be used to indicate whether configureStore should automatically enable support for the Redux DevTools browser extension.
    devTools:true
})
export  default store