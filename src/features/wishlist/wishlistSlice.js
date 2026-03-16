// createSlice defines Redux state + reducers and auto-generates action creators.
import { createSlice } from "@reduxjs/toolkit";

// Wishlist slice manages a simple list of items the user saved.
const wishlistSlice = createSlice({
  // Slice name scopes action types (e.g., "wishlist/addWishlist").
  name: "wishlist",
  // Start with an empty list; no persistence is used here.
  initialState: {
    items: [],
  },

  reducers: {
    // Add a product object to the wishlist array.
    // Immer allows push-style mutation while keeping state immutable.
    addWishlist: (state, action) => {
      state.items.push(action.payload);
    },

    // Remove a product by id so the wishlist stays unique and in sync.
    removeWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

// Export action creators for components to dispatch.
export const { addWishlist, removeWishlist } = wishlistSlice.actions;

// Export reducer for store registration.
export default wishlistSlice.reducer;
