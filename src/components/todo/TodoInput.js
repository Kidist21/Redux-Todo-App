import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../../features/todos/todosSlice";

function TodoInput() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (input.trim() === "") return;
    dispatch(addNewTodo({ text: input, completed: false }));
    setInput(""); // Clear input
  };

  return (
    <div className="flex items-center space-x-4 my-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo..."
        className="border-2 border-gray-300 p-2 rounded flex-1"
      />
      <button
        onClick={handleAddTodo}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}

export default TodoInput;
