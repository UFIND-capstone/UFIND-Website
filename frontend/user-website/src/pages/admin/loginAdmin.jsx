import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Import the custom hook

// Exporting the LoginAdmin component
export const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const { login, user } = useAuth(); // Get the login function and user state from context
  const hostUrl = import.meta.env.VITE_HOST_URL;

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard'); // Redirect to admin dashboard if logged in
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${hostUrl}/api/admin`, {
        username,
        password,
      });

      console.log("User logged in successfully:", response.data);
      login({ username, role: "admin", }); // Call login function with user data
      navigate('/admin/dashboard'); // Redirect to admin dashboard after login
    } catch (error) {
      setError("Invalid username or password");
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-400">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-xs w-full text-center">
        <h2 className="mb-6 text-2xl text-gray-800 font-semibold">ADMIN LOGIN</h2>

        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4 text-left">
            <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
            LOGIN
          </button>
        </form>

        {/* Administrator Here Link */}
        <div className="mt-4">
          <Link
            to="/user/Login"
            className="text-sm text-blue-500 hover:underline"
          >
            STUDENT HERE
          </Link>
        </div>

      </div>
    </div>
  );
};
