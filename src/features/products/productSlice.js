// createSlice defines Redux state + reducers; createAsyncThunk wraps async logic with pending/fulfilled/rejected actions.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Shared Axios client for API calls.
import axiosInstance from "../../api/axiosInstance";

// Async thunk to fetch products list from the API.
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axiosInstance.get("/products");
    return res.data;
  }
);

// Products slice manages the catalog and loading status.
const productSlice = createSlice({
  name: "products",

  // Start with empty catalog and zero total; loading drives UI spinners.
  initialState: {
    products: [],
    total: 0,
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      // While fetching, mark loading true so the UI can show a loader.
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      // On success, store products and total count; stop loading.
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      });
  },
});

// Export reducer for store registration.
export default productSlice.reducer;
