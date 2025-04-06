import React from "react";
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
import ProfileImage from "../../assets/PROFILE.png"

export const MyAccountAdmin = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <div className="flex-1 bg-gray-100 p-6 md:p-5 overflow-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            MY ACCOUNT
          </h1>

          {/* Profile Card Container */}
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={ProfileImage} // Replace with actual profile image path
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-md"
              />
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                Jared Salvan
              </h2>
              <p className="text-gray-500">rarasalvan@gmail.com</p>
            </div>

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Username:</span>
                <span className="border-b pb-1">JaredSalvan101</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Email Address:</span>
                <span className="border-b pb-1">rarasalvan@gmail.com</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Contact Number:</span>
                <span className="border-b pb-1">+1234567890</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Address:</span>
                <span className="border-b pb-1">Iponan, Cagayan de Oro City</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Gender:</span>
                <span className="border-b pb-1">Male</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Password:</span>
                <span className="border-b pb-1">********</span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="flex justify-center mt-8">
              <button className="py-3 px-10 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
