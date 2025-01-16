import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/admin/footer";
import Topbar from "../../components/admin/topBar";

const CompleteItemAdmin = () => {
  const [item, setItem] = useState(null); // Initialize as null
  const [claimant, setClaimant] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { itemID } = useParams();
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const itemResponse = await axios.get(`http://localhost:3000/api/items/${itemID}`);
        setItem(itemResponse.data);
        const claimantResponse = await axios.get(`http://localhost:3000/api/items/completed/${itemID}`);
        setClaimant(claimantResponse.data);
      } catch (err) {
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemID]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading item details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!item) {
    return <p className="text-center text-gray-500">Item not found</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Topbar />
      <div className="flex-grow p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left Section */}
          <div className="p-6 bg-gray-50 flex flex-col justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="self-start text-gray-600 hover:text-gray-900 mb-4"
            >
              ← Back
            </button>
            <img
              src={item.imageUrl || "/placeholder-image.png"}
              alt={item.name || "Lost Item"}
              className={item.status === "found" ? "blur-md" : ""}
            />
          </div>

          {/* Right Section */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {item.name || "Unnamed Item"}
            </h2>
            <p
              className={`text-lg font-medium mb-4 ${
                item.status === "lost" ? "text-red-500" : "text-green-500"
              }`}
            >
              {item.status === "lost" ? "Lost" : "Found"}
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700">Full Name:</p>
                <p className="text-gray-600">{item.fullName || "Unknown"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Description:</p>
                <p>{item.description || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Date:</p>
                <p className="text-gray-600">
                  {item.dateTime
                    ? new Date(item.dateTime).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                    : "Not specified"}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  Last Seen Location:
                </p>
                {item.location ? (
                  <p className="text-gray-600">{item.location}</p>
                ) : (
                  <p className="text-gray-600">No location available</p>
                )}
              </div>
            </div>

            {/* Claimant Details Section */}
            {claimant && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Claimant's Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-700">Student ID:</p>
                    <p className="text-gray-600">{claimant.studentId || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Name:</p>
                    <p className="text-gray-600">{claimant.name || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Year & Section:</p>
                    <p className="text-gray-600">{claimant.yearSection || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Contact Number:</p>
                    <p className="text-gray-600">{claimant.contactNumber || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Date Completed:</p>
                    <p className="text-gray-600">{claimant.dateCompleted || "Unknown"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompleteItemAdmin;
