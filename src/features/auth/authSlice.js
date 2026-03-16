// createSlice defines Redux state + reducers; createAsyncThunk wraps async logic with pending/fulfilled/rejected actions.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Axios is an HTTP client for making API requests.
import axios from "axios";

// Local storage key for fallback user accounts when API is unavailable.
const ACCOUNTS_KEY = "ecommerce_accounts";

// Safely read stored accounts; return [] on missing data or invalid JSON.
const getAccounts = () => {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
  } catch {
    return [];
  }
};

// Persist accounts to localStorage so local login/signup can work offline.
const saveAccounts = (accounts) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

// Async thunk to handle signup through API, with local fallback on failure.
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data, { rejectWithValue }) => {
    // Build the payload expected by the backend.
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.joinAsSeller ? "seller" : "customer",
    };

    try {
      // Primary path: signup via remote API.
      const res = await axios.post(
        "http://65.0.29.192:5000/api/auth/signup",
        payload
      );
      return res.data;
    } catch {
      // Fallback path: store accounts locally to keep the app usable.
      const accounts = getAccounts();
      const exists = accounts.some(
        (acc) =>
          acc.email?.toLowerCase() === payload.email?.toLowerCase() ||
          acc.username?.toLowerCase() === payload.username?.toLowerCase()
      );

      if (exists) {
        return rejectWithValue("Email or username already exists.");
      }

      // Create a local user record with a simple client-side id.
      const localAccount = { id: Date.now(), ...payload };
      saveAccounts([...accounts, localAccount]);
      return { user: localAccount, source: "local" };
    }
  }
);

// Async thunk to handle login through API, with local fallback on failure.
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      // Primary path: login via remote API.
      const res = await axios.post(
        "http://65.0.29.192:5000/api/auth/login",
        data
      );
      return res.data;
    } catch (error) {
      // Fallback path: check stored accounts locally.
      const accounts = getAccounts();
      const localUser = accounts.find(
        (acc) =>
          acc.email?.toLowerCase() === data.email?.toLowerCase() &&
          acc.password === data.password
      );

      if (!localUser) {
        // Prefer server-provided message when available.
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Invalid email or password.";
        return rejectWithValue(message);
      }

      // Local user found; return in a shape similar to API response.
      return { user: localUser, source: "local" };
    }
  }
);

// Auth slice holds login state and request status for UI feedback.
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    // Clear any success/error banners after displaying them in the UI.
    clearMessage: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup lifecycle: pending -> fulfilled/rejected.
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = "Signup successful";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      })
      // Login lifecycle: pending -> fulfilled/rejected.
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Login successful";
        state.user = action.payload.user || action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

// Export actions for UI to clear messages.
export const { clearMessage } = authSlice.actions;

// Export reducer for store registration.
export default authSlice.reducer;
