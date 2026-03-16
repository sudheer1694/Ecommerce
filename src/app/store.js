// import { configureStore } from "@reduxjs/toolkit";

// import productReducer from "../features/products/productSlice";
// import cartReducer from "../features/cart/cartSlice";
// import wishlistReducer from "../features/wishlist/wishlistSlice";
// import authReducer from "../features/auth/authSlice";

// export const store = configureStore({
//   reducer: {
//     products: productReducer,
//     cart: cartReducer,
//     wishlist: wishlistReducer,
//     auth: authReducer,
//   },
// });

// configureStore sets up the Redux store with good defaults (DevTools, middleware, etc.).
import { configureStore } from "@reduxjs/toolkit"

import productReducer from "../features/products/productSlice"
import cartReducer from "../features/cart/cartSlice"
import wishlistReducer from "../features/wishlist/wishlistSlice"
import authReducer from "../features/auth/authSlice"

// Central Redux store configuration for the app.
// Each slice reducer is mounted under a key used to access its state.
export const store = configureStore({

reducer:{

products:productReducer,
cart:cartReducer,
wishlist:wishlistReducer,
auth:authReducer

}

})
