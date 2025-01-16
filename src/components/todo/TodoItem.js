import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../features/todos/todosSlice";

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li
      className="flex items-center justify-between my-2 p-2 border rounded"
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        color: todo.completed ? "gray" : "black",
      }}
    >
      <span
        onClick={() => dispatch(toggleTodo(todo))}
        className="cursor-pointer"
      >
        {todo.text}
      </span>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
