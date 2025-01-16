import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for JSON Server
const BASE_URL = "http://localhost:5000/todos";

// Async Thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addNewTodo = createAsyncThunk("todos/addNewTodo", async (todo) => {
  const response = await axios.post(BASE_URL, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (todo) => {
  const updatedTodo = { ...todo, completed: !todo.completed }; // Flip the current completed status
  const response = await axios.patch(`${BASE_URL}/${todo.id}`, updatedTodo); // Update on the server
  return response.data;
});

// Define the initial state
const initialState = {
  todos: [], // Array to store todo items
  filter: "all", // Default filter
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create the slice
const todosSlice = createSlice({
  name: "todos", // Name of the slice
  initialState,
  reducers: {
    // Filter Todos
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add New Todo
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      // Toggle Todo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const existingTodo = state.todos.find(
          (todo) => todo.id === updatedTodo.id
        );
        if (existingTodo) {
          existingTodo.completed = updatedTodo.completed; // Update the completed status
        }
      });
  },
});

// Export the actions
export const { setFilter } = todosSlice.actions;

// Export the reducer to integrate it into the store
export default todosSlice.reducer;
