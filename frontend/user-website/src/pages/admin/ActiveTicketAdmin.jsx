import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ActiveTicketAdmin = () => {
  const [items, setItems] = useState([]); // All items from the API
  const [filteredItems, setFilteredItems] = useState([]); // Items filtered by search
  const [searchTerm, setSearchTerm] = useState(''); // User's search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hostUrl = import.meta.env.VITE_HOST_URL;
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${hostUrl}/api/items`);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const foundItems = response.data.filter((item) => {
        if (item.ticket === "pending") {
          const itemDate = new Date(item.dateTime.replace(" ", "T"));
          return itemDate > thirtyDaysAgo;
        }
        return false;
      });
      
      setItems(foundItems);
      setFilteredItems(foundItems);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch items");
      setLoading(false);
    }
  };
  

  // Fetch items from the server
  useEffect(() => {
    fetchItems();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter items based on name or description
    if (value === '') {
      setFilteredItems(items); // Reset to all items if search is cleared
    } else {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.description?.toLowerCase().includes(value)
      );
      setFilteredItems(filtered);
    }
  };

  // Mark an item as "Success"
  const handleSuccess = async (id) => {
    try {
      await axios.put(`${hostUrl}/api/items/${id}`, { ticket: 'success' });
      await fetchItems(); // Refetch items after marking as success
    } catch (err) {
      setError('Failed to mark item as success');
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${hostUrl}/api/items/${id}`);
      await fetchItems(); // Refetch items after deletion
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  // Navigate to image description page
  const handleImageClick = (item, e) => {
    e.stopPropagation(); // Prevent Link from triggering
    navigate(`/admin/items/${item.id}`, { state: { item } });
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
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">BROWSE ACTIVE TICKETS</h1>

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

          {/* Loading/Error Message */}
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
                  className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer"
                  onClick={(e) => handleImageClick(item, e)}
                >
                  <img
                    src={item.imageUrl || '/placeholder-image.png'} // Fallback image if no URL
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Date:</strong> {item.dateTime}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 flex justify-between">
                    <button
                      className="w-full px-8 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      onClick={(e) => { e.stopPropagation(); handleSuccess(item.id); }}
                    >
                      MARK AS SUCCESS
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

export default ActiveTicketAdmin;
