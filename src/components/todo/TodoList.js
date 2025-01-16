import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { fetchTodos } from "../../features/todos/todosSlice";
import { useNavigate } from "react-router-dom";
// import { logout } from '../features/authSlice';
import { toast } from "react-toastify";
import { logout } from "../../features/auth/authSlice";

function TodoList() {
  const { todos, filter, status, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // Default: 'all'
  });

  return (
    <div>
      {filteredTodos.length === 0 ? (
        <p className="text-gray-500">No todos to display.</p>
      ) : (
        <ul>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-gray-100 text-blue-500 py-2 px-4 mt-4 rounded-lg hover:text-blue-700 font-semibold transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default TodoList;
