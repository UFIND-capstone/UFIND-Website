import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";

const CompleteItem = () => {
  const [item, setItem] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const [claimDetails, setClaimDetails] = useState({
    studentId: "",
    name: "",
    yearSection: "",
    contactNumber: "",
  });

  useEffect(() => {
    // Simulating fetching item data
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API response with the provided JSON object
        const data = {
          id: 1,
          name: "Lost Tumbler",
          status: "lost",
          imageUrl: "/src/assets/aquaflask.png",
          fullName: "Jefferson Sabejon",
          description: "I lost my tumbler, please return it.",
          dateTime: "2025-01-16T10:25:00Z",
          location: "USTP Campus",
          studentId: 123,
        };
        setItem(data);
      } catch (err) {
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimDetails({ ...claimDetails, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Claim/Finder details submitted:", claimDetails);
    alert("Details submitted successfully!");
    // Here you could send the data to an API or handle it further.
  };

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
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
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

            {/* Claim or Find Details Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                CLAIM OR FIND DETAILS
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Claimer's/Finder's Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={claimDetails.studentId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter your student ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Claimer's/Finder's Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={claimDetails.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Year & Section
                  </label>
                  <input
                    type="text"
                    name="yearSection"
                    value={claimDetails.yearSection}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter your year and section"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={claimDetails.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter your contact number"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 font-semibold text-white py-3 rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
};

export default CompleteItem;
