import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="path-to-your-logo" alt="U-Find Logo" className="w-10 h-10" />
            <h1 className="text-3xl font-bold text-blue-500">U-FIND</h1>
          </div>
          <nav className="flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-500">HOME</a>
            <a href="#about" className="text-gray-700 hover:text-blue-500">ABOUT US</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-500">CONTACT US</a>
          </nav>
          <img src="path-to-profile-icon" alt="Profile Icon" className="w-10 h-10 rounded-full" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <section className="text-center mb-10">
          <div className="flex justify-center items-center space-x-10">
            <img src="path-to-detective-image" alt="Detective Illustration" className="w-48 h-48" />
            <div className="text-left">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">U-FIND</h2>
              <p className="text-gray-700 mb-6">
                U-find is a web and mobile platform for reporting, tracking, and retrieving lost and
                found items on campus. Secure authentication and real-time notifications help quickly
                reunite lost items with their owners, while admins efficiently manage reports.
              </p>
              <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                REPORT NOW!
              </button>
            </div>
          </div>
        </section>

        {/* Browse Items Section */}
        <section className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">BROWSE ITEMS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Item Cards */}
            {['NECKLACE', 'SCHOOL ID', 'AQUAFLASK', 'CALCULATOR', 'WALLET'].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition">
                <img src={`path-to-${item.toLowerCase()}-image`} alt={item} className="w-full h-32 object-cover mb-4 rounded-md" />
                <h3 className="font-semibold text-gray-800">{item}</h3>
                <p className="text-gray-600">Lost in Cafeteria</p>
              </div>
            ))}
          </div>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
            VIEW MORE
          </button>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
