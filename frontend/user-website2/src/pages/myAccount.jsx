import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Topbar from '../components/topBar';
import Footer from '../components/footer';

export const MyAccount = () => {
  const navigate = useNavigate();

  // Function to handle logout and navigate to the login page
  const handleLogout = () => {
    // Perform any necessary logout operations here (e.g., clearing tokens)
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="w-full">
        {/* Topbar */}
        <Topbar />

        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-400 p-10">
          <h1 className="text-4xl text-white font-bold text-center mb-10">MY ACCOUNT</h1>

          {/* Profile Card */}
          <div className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow-lg">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <img
                src="/src/assets/PROFILE.png" // Replace with actual profile image
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md"
              />
            </div>

            {/* User Information */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Jared Salvan</h2>
              <p className="text-gray-600 mb-2">jaredsalvan123@gmail.com</p>
            </div>

            <div className="space-y-4">
              {/* Username */}
              <div className="flex justify-between text-gray-600">
                <strong>Username:</strong> JaredSalvan101
              </div>

              {/* Email */}
              <div className="flex justify-between text-gray-600">
                <strong>Email Address:</strong> jaredsalvan123@gmail.com
              </div>

              {/* Contact Number */}
              <div className="flex justify-between text-gray-600">
                <strong>Contact Number:</strong> +1234567890
              </div>

              {/* Address */}
              <div className="flex justify-between text-gray-600">
                <strong>Address:</strong> Iponan, Cagayan de Oro City
              </div>

              {/* Gender */}
              <div className="flex justify-between text-gray-600">
                <strong>Gender:</strong> Male
              </div>

              {/* Password */}
              <div className="flex justify-between text-gray-600">
                <strong>Password:</strong> ********
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-center gap-4 mt-6">
              {/* Edit Button */}
              <button className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Edit Profile
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="py-2 px-6 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};
