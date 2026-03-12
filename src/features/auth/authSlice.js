import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ACCOUNTS_KEY = "ecommerce_accounts";

const getAccounts = () => {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveAccounts = (accounts) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data, { rejectWithValue }) => {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.joinAsSeller ? "seller" : "customer",
    };

    try {
      const res = await axios.post(
        "http://65.0.29.192:5000/api/auth/signup",
        payload
      );
      return res.data;
    } catch {
      const accounts = getAccounts();
      const exists = accounts.some(
        (acc) =>
          acc.email?.toLowerCase() === payload.email?.toLowerCase() ||
          acc.username?.toLowerCase() === payload.username?.toLowerCase()
      );

      if (exists) {
        return rejectWithValue("Email or username already exists.");
      }

      const localAccount = { id: Date.now(), ...payload };
      saveAccounts([...accounts, localAccount]);
      return { user: localAccount, source: "local" };
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://65.0.29.192:5000/api/auth/login",
        data
      );
      return res.data;
    } catch (error) {
      const accounts = getAccounts();
      const localUser = accounts.find(
        (acc) =>
          acc.email?.toLowerCase() === data.email?.toLowerCase() &&
          acc.password === data.password
      );

      if (!localUser) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Invalid email or password.";
        return rejectWithValue(message);
      }

      return { user: localUser, source: "local" };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { clearMessage } = authSlice.actions;

export default authSlice.reducer;
