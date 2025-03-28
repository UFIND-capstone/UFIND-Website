import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mel-backend.jwisnetwork.com/api/user", {
        studentId,
        password,
      });

      console.log("User logged in successfully:", response.data);

      const userData = response.data.user;

      if (userData.status === "blocked") {
        setError("Your account is blocked. Please contact support.");
        return;
      }

      if (userData.member === "guard") {
        setError("This account can only be used in the mobile application.");
        return;
      }

      login({
        studentId: userData.studentId,
        emailAddress: userData.emailAddress,
        firstName: userData.firstName,
        contactNumber: userData.contactNumber,
        lastName: userData.lastName,
        id: userData.id,
        role: "user",
      });

      navigate("/dashboard");
    } catch (error) {
      setError("Invalid student ID or password");
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400 p-4">
      {/* Left side with image */}
      <div className="hidden md:flex flex-1 justify-center">
        <img
          src="/src/assets/LOGO.png" // Replace with the correct image path
          alt="Login Illustration"
          className="max-w-md"
        />
      </div>

      {/* Login form */}
      <div className="bg-white mx-20 px-10 py-10 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="mb-5 text-3xl text-gray-800 font-bold text-center">
          USER LOGIN
        </h2>

        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="studentId"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle password type
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility state
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="mb-4 text-right">
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            LOGIN
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 font-semibold hover:underline">
                Register Now
              </a>
            </p>
          </div>
        </form>

        {/* Admin login link */}
        <div className="mt-6 text-center">
          <Link
            to="/admin/adminLogin"
            className="text-sm text-blue-500 font-semibold hover:underline"
          >
            ADMIN HERE
          </Link>
        </div>
      </div>
    </div>
  );
};
