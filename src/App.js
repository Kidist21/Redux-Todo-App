import Header from "./components/todo/Header";
import TodoInput from "./components/todo/TodoInput";
import TodoList from "./components/todo/TodoList";
import FilterControls from "./components/todo/FilterControls";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/utility/ProtectedRoute";

function App() {
  return (
    <div className="container mx-auto py-8 px-12 rounded-lg shadow-lg w-3/5">
      {/* <Header />
      <TodoInput />
      <FilterControls />
      <TodoList />
      <Register />
      <Login /> */}

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <Header />
                <TodoInput />
                <FilterControls />
                <TodoList />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
