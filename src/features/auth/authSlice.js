import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/users";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await axios.post(BASE_URL, userData);

    // Simulating token generation and storing in localStorage
    localStorage.setItem("authToken", userData.id);

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await axios.get(BASE_URL);
    const user = response.data.find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }

    localStorage.setItem("authToken", user.id);

    return { user };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isAuthenticated: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("authToken"); // Remove the token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = "Invalid credentials";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
