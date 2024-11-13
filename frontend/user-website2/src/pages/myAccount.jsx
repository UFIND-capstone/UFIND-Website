import React from 'react';
import Topbar from '../components/topBar';
import Footer from '../components/footer';

export const MyAccount = () => {
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Jared Animal</h2>
              <p className="text-gray-600 mb-2">raraanimal@gmail.com</p>
            </div>

            <div className="space-y-4">
              {/* Username */}
              <div className="flex justify-between text-gray-600">
                <strong>Username:</strong> JaredAnimal101
              </div>

              {/* Email */}
              <div className="flex justify-between text-gray-600">
                <strong>Email Address:</strong> raraanimal@gmail.com
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

            {/* Edit Button */}
            <div className="flex justify-center mt-6">
              <button className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Edit Profile
              </button>
            </div>

          </div>
        </div>
        <div className="w-full">
        {/* footer */}
        <Footer />
    </div>
      </div>
    </div>
  );
};

