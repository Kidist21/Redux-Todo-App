import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000/users";

// Simulating the creation of JWT token after login (in reality, this would come from your server)
const generateToken = (user) => {
  return `fake-jwt-token-for-${user.username}`; // Fake JWT Token
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await axios.post(BASE_URL, userData);
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

    // Simulating token generation and storing in localStorage
    const token = generateToken(user);
    localStorage.setItem("authToken", token);

    return { user, token };
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
        toast.success("Registered successfully!");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
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
