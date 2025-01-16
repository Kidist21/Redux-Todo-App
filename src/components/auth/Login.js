import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const validateForm = () => {
    if (username.trim() === "") {
      setError("Username is required");
      return false;
    }
    if (password.trim() === "") {
      setError("Password is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      //   dispatch(loginUser({ username, password }));
      const result = await dispatch(loginUser({ username, password }));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!");
        navigate("/todos");
      } else {
        toast.error(authError || "Invalid credentials");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login
        </h2>
        {error && (
          <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
            {error}
          </div>
        )}
        {authError && (
          <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
            {authError}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-gray-700">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
