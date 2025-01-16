import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../features/todos/todosSlice";

const FilterControls = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.todos.filter);

  const filters = ["all", "active", "completed"];

  return (
    <div className="flex justify-center mt-4 space-x-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch(setFilter(filter))}
          className={`px-4 py-2 rounded-md ${
            currentFilter === filter
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterControls;
