import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer";
import Topbar from "../components/topBar";

const ItemDescription = () => {
  const navigate = useNavigate();
  const { itemID } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/items/${itemID}`
        );
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch item details");
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemID]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Topbar />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading item details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Left Container */}
            <div className="flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r bg-gray-50">
              <button
                onClick={() => navigate(-1)}
                className="self-start text-gray-600 hover:text-gray-900 mb-4 focus:outline-none"
              >
                ← Back
              </button>
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={item.image || "/placeholder-image.png"} // Fallback image if no URL
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Container */}
            <div className="p-6 flex flex-col space-y-6">
              {/* Item Name */}
              <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={item.fullName || "Unknown"}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>

              {/* Last Seen Location */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Seen Location
                </label>
                <input
                  type="text"
                  defaultValue={item.lastSeen || "Unknown"}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  defaultValue={item.description || "No description available"}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Date
                </label>
                <input
                  type="text"
                  defaultValue={
                    item.dateTime
                      ? new Date(item.dateTime).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "Unknown"
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>

              {/* Posted By */}
              <p className="text-gray-600">
                Posted by{" "}
                <span className="font-semibold">{item.postedBy || "N/A"}</span>
              </p>

              {/* Send Message Button */}
              <button className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ItemDescription;
