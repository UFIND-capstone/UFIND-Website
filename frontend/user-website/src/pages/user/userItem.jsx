import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/user/footer";
import Topbar from "../../components/user/topBar";
import axios from "axios";

const UserItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    dateTime: "",
    fullName: "", // Changed from contactName to match backend
    contactNumber: "",
    email: "",
    imageUrl: "",
    status: "lost", // Added default status
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items/${itemId}`);
        // Format the datetime string to be compatible with datetime-local input
        const formattedDateTime = response.data.dateTime 
          ? new Date(response.data.dateTime).toISOString().slice(0, 16)
          : "";
        
        setItemData({
          ...response.data,
          dateTime: formattedDateTime
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsSubmitting(true);
  
    try {
      await axios.put(`http://localhost:3000/api/items/edit/${itemId}`, {
        ...itemData,
        dateTime: new Date(itemData.dateTime).toISOString(), // Format date for backend
      });
  
      alert("Item updated successfully!");
      navigate(-1); // Go back to the previous page
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update the item. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Topbar />
        <div className="flex justify-center items-center h-64">
          <p className="text-center text-gray-500">Loading item details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Topbar />
      <div className="flex-grow p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Image and Back Button */}
          <div className="p-6 bg-gray-50 flex flex-col justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="self-start text-gray-600 hover:text-gray-900 mb-4"
            >
              ← Back
            </button>
            <img
              src={itemData.imageUrl || "/placeholder-image.png"}
              alt={itemData.name || "Lost Item"}
              className="rounded-lg shadow-md max-w-full h-auto"
            />
          </div>

          {/* Right Side: Edit Form */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Item Details
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSaveChanges} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={itemData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={itemData.description}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date and Time
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={itemData.dateTime}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={itemData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={itemData.contactNumber}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={itemData.email}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={itemData.status}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserItem;