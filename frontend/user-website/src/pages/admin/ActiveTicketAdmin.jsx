import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import supabase from "../../config/supabaseClient";

const ActiveTicketAdmin = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 9; // Items per page

  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);

  const [claimerDetails, setClaimerDetails] = useState({
    studentId: "",
    name: "",
    yearSection: "",
    contactNumber: "",
    imageUrl: "", // Add imageUrl to store the uploaded image URL
  });

  const hostUrl = import.meta.env.VITE_HOST_URL;
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Only JPG and PNG files are allowed.");
        return;
      }
      setImageFile(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) {
      alert("Please select an image!");
      return null;
    }

    setUploading(true);
    const fileName = `${Date.now()}_${imageFile.name}`;
    try {
      const { error } = await supabase.storage
        .from("images")
        .upload(fileName, imageFile);

      if (error) throw error;

      const imageUrl = `https://tqvgagdffmjtxswldtgm.supabase.co/storage/v1/object/public/images/${fileName}`;
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Error uploading image. Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

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

    let currentViewItems = items;

    if (view === 'turnoverTicket') {
      currentViewItems = items.filter(
        (item) => item.claimStatus === "turnover(osa)" && item.ticket === "pending"
      );
    } else if (view === 'itemLost') {
      currentViewItems = items.filter(
        (item) => item.status === "lost" && item.ticket === "pending"
      );
    } else if (view === 'itemFound') {
      currentViewItems = items.filter(
        (item) => item.status === "found" && item.ticket === "pending"
      );
    }

    const filtered = value
      ? currentViewItems.filter(item =>
          item.name.toLowerCase().includes(value) ||
          item.description?.toLowerCase().includes(value)
        )
      : currentViewItems;

    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  const handleViewChange = (viewType) => {
    setView(viewType);

    if (viewType === 'turnoverTicket') {
      const turnoverItems = items.filter(
        (item) => item.claimStatus === "turnover(osa)" && item.ticket === "pending"
      );
      setFilteredItems(turnoverItems);
    } else if (viewType === 'itemLost') {
      const lostItems = items.filter(
        (item) => item.status === "lost" && item.ticket === "pending"
      );
      setFilteredItems(lostItems);
    } else if (viewType === 'itemFound') {
      const foundItems = items.filter(
        (item) => item.status === "found" && item.ticket === "pending"
      );
      setFilteredItems(foundItems);
    } else {
      setFilteredItems(items);
    }

    if (searchTerm) {
      handleSearch({ target: { value: searchTerm } });
    }

    setCurrentPage(1); // Reset to the first page
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setClaimerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitModal = async () => {
    try {
            // Upload image first
            const imageUrl = await uploadImage();
            if (!imageUrl) return;
      const data = {
        ...claimerDetails,
        itemId: currentItem.id,
        imageUrl, // Add the image URL to the submission
      };

      await axios.post(`${hostUrl}/api/items/claim`, data);
      await axios.put(`${hostUrl}/api/items/${currentItem.id}`, {
        ticket: 'success'
      });

      setShowModal(false);
      setClaimerDetails({
        studentId: "",
        name: "",
        yearSection: "",
        contactNumber: "",
        imageUrl: "", // Reset the image URL
      });

      await fetchItems();

      alert("Claim submitted successfully!");
    } catch (err) {
      console.error("Failed to submit claim:", err);
      setError('Failed to submit claim. Please try again.');
      alert("Failed to submit claim. Please try again.");
    }
  };

  const openModal = (item) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleImageClick = (item, e) => {
    e.stopPropagation();
    navigate(`/admin/items/${item.id}`, { state: { item } });
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading items...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredItems.length === 0 ? (
            <p className="text-center text-gray-500">No tickets found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedItems.map((item) => (
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
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        openModal(item);
                      }}
                    >
                      MARK AS SUCCESS
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            </>
          )}
        </main>

        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-2xl text-center font-bold mb-4">CLAIM OR FIND DETAILS</h3>
              <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500">
              <input
                type="file"
                onChange={handleImageChange}
                accept=".jpg,.png"
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12 mb-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-9-12v12m0 0l3.75-3.75M12 16.5L8.25 12.75"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {imageFile ? imageFile.name : "Upload Image"}
                </span>
              </label>
            </div>
            {imageFile && (
              <p className="mt-2 text-sm text-green-600">
                Image selected: {imageFile.name}
              </p>
            )}
            <p className="mt-5 text-sm text-gray-600">
              For security reasons, please upload a photo of the found item. You may hold the item or include your student ID in the picture. Thank you!
            </p>
          </div>
          <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Claimer's/Finder's Student ID
        </label>
        <input
          type="text"
          name="studentId"
          placeholder="Enter a Claimer's/Finder's Student ID"
          value={claimerDetails.studentId}
          onChange={handleModalInputChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Claimer's/Finder's Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter a Claimer's/Finder's Name"
          value={claimerDetails.name}
          onChange={handleModalInputChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Year & Section
                </label>
                <input
                  type="text"
                  name="yearSection"
                  placeholder="Enter a Year & Section"
                  value={claimerDetails.yearSection}
                  onChange={handleModalInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Enter a Contact Number"
                  value={claimerDetails.contactNumber}
                  onChange={handleModalInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex justify-end justify-center space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white w-25 px-12 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitModal}
                  className="bg-blue-500 text-white w-25 px-14 py-2 rounded hover:bg-blue-600"
                >
                  Submit
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
