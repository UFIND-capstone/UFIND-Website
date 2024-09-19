import React from "react";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-400">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-xs w-full text-center">
        <h2 className="mb-6 text-2xl text-gray-800 font-semibold">ADMIN LOGIN</h2>

        <form>

          <div className="mb-4 text-left">
            <label htmlFor="username" className="block mb-2 text-sm text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="password" className="block mb-2 text-sm text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">LOGIN</button>
        
        </form>
        
      </div>
    </div>
  );
};

export default Login;
