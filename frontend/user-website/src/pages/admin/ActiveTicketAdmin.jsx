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
  const [view, setView] = useState('all'); // View state for "all" or "turnover"
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

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

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

  const handleViewChange = (viewType) => {
    setView(viewType);
    if (viewType === 'turnover') {
      const turnoverItems = items.filter(
        (item) => item.claimStatus === "turnover(osa)" && item.ticket === "pending"
      );
      setFilteredItems(turnoverItems);
    } else {
      setFilteredItems(items); // Reset to all items
    }
  };

    const [showModal, setShowModal] = useState(false);
    const [claimerDetails, setClaimerDetails] = useState({
    studentId: '',
    name: '',
    yearSection: '',
    contactNumber: ''
});

  const handleModalInputChange = (e) => {
  const { name, value } = e.target;
  setClaimerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
};

  const handleSubmitModal = () => {
  console.log("Submitted details:", claimerDetails);
  setShowModal(false); // Close modal after submission
};


  const handleSuccess = async (id) => {
    try {
      await axios.put(`${hostUrl}/api/items/${id}`, { ticket: 'success' });
      await fetchItems(); // Refetch items after marking as success
    } catch (err) {
      setError('Failed to mark item as success');
    }
  };

  const handleImageClick = (item, e) => {
    e.stopPropagation();
    navigate(`/admin/items/${item.id}`, { state: { item } });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">BROWSE ACTIVE TICKETS</h1>

          <div className="flex justify-center mb-4">
            <button
              onClick={() => handleViewChange('all')}
              className={`px-10 py-2 mr-2 ${view === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            >
              ALL
            </button>
            <button
              onClick={() => handleViewChange('turnoverTicket')}
              className={`px-10 py-2 mr-2 ${view === 'turnoverTicket' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            >
              TURNOVER
            </button>
            <button
              onClick={() => handleViewChange('itemLost')}
              className={`px-10 py-2 mr-2 ${view === 'itemLost' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            >
              ITEM LOST
            </button>
            <button
              onClick={() => handleViewChange('itemFound')}
              className={`px-10 py-2 mr-2 ${view === 'itemFound' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            >
              ITEM FOUND
            </button>
          </div>

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
                    src={item.imageUrl || '/placeholder-image.png'}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Date:</strong> {item.dateTime}
                  </p>

                  <button
                    className="w-full px-8 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                  >
                    MARK AS SUCCESS
                  </button>

                </div>
              ))}
            </div>
          )}
        </main>

        {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-3xl text-center font-bold mb-4">CLAIM OR FIND DETAILS</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Student ID</label>
              <input
                type="text"
                name="studentId"
                placeholder="Enter a Student ID"
                value={claimerDetails.studentId}
                onChange={handleModalInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter a name"
                value={claimerDetails.name}
                onChange={handleModalInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Year & Section</label>
              <input
                type="text"
                name="yearSection"
                placeholder="Enter a Year & Section"
                value={claimerDetails.yearSection}
                onChange={handleModalInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                placeholder="Enter a Contact Number"
                value={claimerDetails.contactNumber}
                onChange={handleModalInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                CANCEL
              </button>
              <button
                onClick={handleSubmitModal}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                SUBMIT
              </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default ActiveTicketAdmin;
