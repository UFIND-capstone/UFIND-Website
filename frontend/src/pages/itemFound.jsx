import React from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topBar';

const items = [
  {
    id: 1,
    name: 'Umbrella',
    location: 'Cafeteria',
    date: '2024-09-07',
    time: '11:00 AM',
    image: 'https://via.placeholder.com/150' // Placeholder image
  },
  {
    id: 2,
    name: 'Headphones',
    location: 'Library',
    date: '2024-09-08',
    time: '09:30 AM',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Notebook',
    location: 'Classroom 203',
    date: '2024-09-09',
    time: '03:00 PM',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    name: 'Water Bottle',
    location: 'Gym',
    date: '2024-09-10',
    time: '07:45 AM',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 5,
    name: 'Scarf',
    location: 'Hallway',
    date: '2024-09-11',
    time: '01:15 PM',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 6,
    name: 'Shoes',
    location: 'Parking Lot',
    date: '2024-09-12',
    time: '10:20 AM',
    image: 'https://via.placeholder.com/150'
  }
];

const ItemFound = () => {
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
          <h1 className="text-7xl text-white font-bold text-center mb-10">FOUND ITEMS</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-1">
                  <strong>Last Seen:</strong> {item.location}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Date:</strong> {item.date}
                </p>
                <p className="text-gray-600">
                  <strong>Time:</strong> {item.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFound;
