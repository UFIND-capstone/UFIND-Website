import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/user/footer";
import Topbar from "../../components/user/topBar";
import axios from "axios";

const UserItem = () => {
  const { itemId } = useParams(); // Get item ID from URL
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    dateTime: "",
    contactName: "",
    contactNumber: "",
    email: "",
    status: "lost", // Default value is 'lost'
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch item details
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/items/${itemId}`
        );
        setItemData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch item details.");
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:3000/api/items/${itemId}`, itemData);
      alert("Item updated successfully!");
      navigate(-1); // Go back to the previous page
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Failed to update the item. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading item details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
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
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Right Side: Edit Form */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Ticket
            </h2>
            <form className="space-y-4">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={itemData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={itemData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
                  required
                ></textarea>
              </div>

              {/* Date and Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date and Time
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={itemData.dateTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {/* Contact Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={itemData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={itemData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={itemData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={itemData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>

              {/* Save Changes Button */}
              <button
                type="button"
                onClick={handleSaveChanges}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserItem;
