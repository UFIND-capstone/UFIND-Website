import React, { useState } from 'react';
import Sidebar from '../components/sideBar';
import Topbar from '../components/topBar';

const ItemLost = () => {
  // Manually entered lost items
  const initialItems = [
    {
      name: 'Water Bottle',
      date: 'June 24, 2023 10:59 AM',
      location: 'Cafeteria',
      image: 'src/assets/tumbler.jpg', // Replace with actual path
    },
    {
      name: 'Backpack',
      date: 'July 1, 2023 2:00 PM',
      location: 'Library',
      image: 'src/assets/backpack.png', // Replace with actual path
    },
    {
      name: 'Umbrella',
      date: 'July 10, 2023 9:30 AM',
      location: 'Hallway',
      image: 'src/assets/umbrella.png', // Replace with actual path
    },
    {
      name: 'Jacket',
      date: 'August 5, 2023 4:00 PM',
      location: 'Gym',
      image: 'src/assets/jacket.png', // Replace with actual path
    },
    {
      name: 'Notebook',
      date: 'August 15, 2023 1:45 PM',
      location: 'Classroom 101',
      image: 'src/assets/notebook.png', // Replace with actual path
    },
    {
      name: 'Phone Charger',
      date: 'September 1, 2023 3:15 PM',
      location: 'Study Area',
      image: 'src/assets/charger.jpg', // Replace with actual path
    },
  ];

  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter items based on search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setItems(initialItems); // Reset to original list
    } else {
      const filteredItems = initialItems.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      setItems(filteredItems);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">BROWSE LOST ITEMS</h1>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for an item..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-4 bg-blue-300 text-white rounded-r-lg hover:bg-blue-500">
                        🔍
                    </button>
          </div>

          {/* Lost Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item, index) => (
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
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Date:</strong> {item.date}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {item.location}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ItemLost;
