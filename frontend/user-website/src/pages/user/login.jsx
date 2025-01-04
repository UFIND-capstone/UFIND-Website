import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";
import { useAuth } from "../../AuthContext";

export const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user', {
        studentId,
        password,
      });

      console.log("User logged in successfully:", response.data);

      // Extract the user object from response.data.user
      const userData = response.data.user;

      // Pass the full user data to the login function
      login({
        studentId: userData.studentId,
        emailAddress: userData.emailAddress,
        firstName: userData.firstName,
        contactNumber: userData.contactNumber,
        lastName: userData.lastName,
        id: userData.id,
      });

      navigate('/dashboard');
    } catch (error) {
      setError("Invalid student ID or password");
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-400">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-xs w-full text-center">
        <h2 className="mb-6 text-2xl text-gray-800 font-semibold">USER LOGIN</h2>

        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4 text-left">
            <label htmlFor="studentId" className="block mb-2 text-sm font-bold text-gray-700">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              placeholder="Enter your student ID"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 text-right">
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">LOGIN</button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 font-semibold hover:underline">Register Now</a>
            </p>
          </div>
        </form>

        {/* Administrator Here Link */}
        <div className="mt-4">
          <Link
            to="/admin/adminLogin"
            className="text-sm text-blue-500 hover:underline"
          >
            ADMIN HERE
          </Link>
        </div>

      </div>
    </div>
  );
};
