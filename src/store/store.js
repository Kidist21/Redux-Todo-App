import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer, // Add the todos reducer
    auth: authReducer, // Add the todos reducer
  },
});
