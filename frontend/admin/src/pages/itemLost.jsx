import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topBar';

export const ItemLost = () => {
  const [items, setItems] = useState([]);

  // Fetch items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/items'); // Adjust the URL as needed
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full">
        {/* Topbar */}
        <Topbar />

        {/* Content for Item Lost Page */}
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-400 p-10">
          <h1 className="text-7xl text-white font-bold text-center mb-10">LOST ITEMS</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                <img
                  src={item.image || 'https://via.placeholder.com/150'} // Use placeholder if no image is provided
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-1">
                  <strong>Last Seen:</strong> {item.lastSeen}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Date:</strong> {item.dateAdded}
                </p>
                <p className="text-gray-600">
                  <strong>Time:</strong> {item.timeAdded}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong> {item.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};