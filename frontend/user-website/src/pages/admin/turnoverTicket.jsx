import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
<<<<<<< HEAD
import axios from 'axios';

const TurnoverTicket = () => {
  const [items, setItems] = useState([]); // All items from the API
  const [filteredItems, setFilteredItems] = useState([]); // Items filtered by search
  const [searchTerm, setSearchTerm] = useState(''); // User's search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hostUrl = import.meta.env.VITE_HOST_URL
=======
import { Link } from "react-router-dom";
import axios from 'axios';

const TurnoverTicket = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hostUrl = import.meta.env.VITE_HOST_URL;
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${hostUrl}/api/items`);
<<<<<<< HEAD
        const turnItems = response.data.filter(item => item.claimStatus === 'turnover');
        setItems(turnItems);
        setFilteredItems(turnItems); // Initially display all items
=======
        const foundItems = response.data.filter(
          (item) => item.claimStatus == "turnover" && item.ticket == "pending"
        );
        setItems(foundItems);
        setFilteredItems(foundItems);
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

<<<<<<< HEAD
  // Handle search input changes
=======
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

<<<<<<< HEAD
    // Filter items based on name, description, or other fields
    if (value === '') {
      setFilteredItems(items); // Reset to all items if search is cleared
    } else {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.description?.toLowerCase().includes(value) ||
        item.detailedDescription?.toLowerCase().includes(value)
=======
    if (value === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(
        (item) =>
          item.name.toLowerCase().includes(value) ||
          item.description?.toLowerCase().includes(value) ||
          item.detailedDescription?.toLowerCase().includes(value)
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
      );
      setFilteredItems(filtered);
    }
  };

<<<<<<< HEAD
  // Mark an item as "Success"
  const handleSuccess = async (id) => {
    try {
      await axios.put(`${hostUrl}/api/items/${id}`, { ticket: 'success' });
      // Update the item state locally
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, ticket: 'success' } : item
        )
      );
      setFilteredItems(prevItems =>
        prevItems.map(item =>
=======
  const handleSuccess = async (id) => {
    try {
      await axios.put(`${hostUrl}/api/items/${id}`, { ticket: 'success' });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ticket: 'success' } : item
        )
      );
      setFilteredItems((prevItems) =>
        prevItems.map((item) =>
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
          item.id === id ? { ...item, ticket: 'success' } : item
        )
      );
    } catch (err) {
      setError('Failed to mark item as success');
    }
  };

<<<<<<< HEAD
  // Delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${hostUrl}/api/items/${id}`);
      // Remove the deleted item from the state
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      setFilteredItems(prevItems => prevItems.filter(item => item.id !== id));
=======
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${hostUrl}/api/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setFilteredItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
<<<<<<< HEAD
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">BROWSE TURNOVER TICKETS</h1>

          {/* Search Bar */}
=======
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            BROWSE TURNOVER TICKETS
          </h1>
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
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
<<<<<<< HEAD

          {/* Loading/Error Message */}
=======
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
          {loading ? (
            <p className="text-center text-gray-500">Loading items...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredItems.length === 0 ? (
            <p className="text-center text-gray-500">No tickets found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:-translate-y-1"
                >
<<<<<<< HEAD
                  <img
                    src={item.imageUrl || '/placeholder-image.png'} // Fallback image if no URL
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Date:</strong> {item.dateTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Location:</strong> {item.location}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 flex justify-between">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      onClick={() => handleSuccess(item.id)}
=======
                  <Link to={`/admin/items/${item.id}`}>
                    <img
                      src={item.imageUrl || '/placeholder-image.png'}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Date:</strong> {item.dateTime}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Location:</strong> {item.location}
                    </p>
                  </Link>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleSuccess(item.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
                    >
                      Mark as Success
                    </button>
                    <button
<<<<<<< HEAD
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(item.id)}
=======
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TurnoverTicket;
