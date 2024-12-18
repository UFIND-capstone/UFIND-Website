import React from 'react';
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
export const MatchItems = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full">
        {/* Topbar */}
        <Topbar />

        {/* Content Section */}
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-400 p-10">
          <h1 className="text-4xl text-white font-bold text-center mb-12">MATCH ITEMS</h1>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Client Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Client's Information</h2>
              <p className="text-gray-600 mb-3">
                <strong>Full Name:</strong> John Doe
              </p>
              <p className="text-gray-600 mb-3">
                <strong>Item Description:</strong> Blue backpack with school books
              </p>
              <p className="text-gray-600 mb-3">
                <strong>Last Seen Location:</strong> Library
              </p>
              <p className="text-gray-600">
                <strong>Distinguishing Features:</strong> Small tear on the front pocket
              </p>
            </div>

            {/* Admin Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin's Information</h2>
              <p className="text-gray-600 mb-3">
                <strong>Full Name:</strong> Admin User
              </p>
              <p className="text-gray-600 mb-3">
                <strong>Item Description:</strong> Blue backpack matching description
              </p>
              <p className="text-gray-600 mb-3">
                <strong>Last Seen Location:</strong> Lost and Found Office
              </p>
              <p className="text-gray-600">
                <strong>Distinguishing Features:</strong> Matches description of tear on the front pocket
              </p>
            </div>
          </div>

          {/* Long Claim Button */}
          <div className="flex justify-center">
            <button className="w-full max-w-md py-4 text-xl font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400">
              CLAIM TICKET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
