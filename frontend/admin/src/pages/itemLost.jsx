import React from 'react';
import Sidebar from '../components/sideBar';
import Topbar from '../components/topBar';

const lostItems = new Array(9).fill({
  name: 'Water Bottle',
  date: 'June 24, 2023 10:59 AM',
  location: 'Cafeteria',
  image: 'src/assets/tumbler.png', // Replace with actual path
});

const ItemLost = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full">
        {/* Topbar */}
        <Topbar />
              <h1 className="text-3xl font-bold mt-6 mb-6 text-center text-gray-800">BROWSE LOST ITEMS</h1>
      
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lostItems.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {item.date}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {item.location}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
  
};

export default ItemLost;
