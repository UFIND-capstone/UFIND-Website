import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../../components/user/topBar";
import Footer from "../../components/user/footer";
import axios from "axios";
import supabase from "../../config/supabaseClient";

const ActiveTicket = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [claimerDetails, setClaimerDetails] = useState({
    studentId: "",
    name: "",
    yearSection: "",
    contactNumber: "",
    imageUrl: "", // Add imageUrl to store the uploaded image URL
  });

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

  // Function to fetch tickets
  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/items");
      const data = await response.json();
      const userTickets = data.filter(
        (item) => item.studentId === user.id && item.ticket !== "success" && item.claimStatus == "keep"
      );
      setTickets(userTickets);
      setFilteredTickets(userTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user.id]);

  // Handle search input changes
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = tickets.filter((ticket) =>
      ticket.name.toLowerCase().includes(query) ||
      ticket.description.toLowerCase().includes(query)
    );

    setFilteredTickets(filtered);
  };

  // Open modal and set current ticket
  const openModal = (ticket) => {
    setCurrentTicket(ticket);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setClaimerDetails({
      studentId: "",
      name: "",
      yearSection: "",
      contactNumber: "",
    });
  };

  // Handle form input change in modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Modified handleSubmit to include image upload
  const handleSubmit = async () => {
    try {
      // Upload image first
      const imageUrl = await uploadImage();
      if (!imageUrl) return;

      // Prepare the data to be submitted
      const data = {
        ...claimerDetails,
        imageUrl, // Add the image URL to the submission
        itemId: currentTicket.id,
        studentId: user.id,
      };

      // Submit the claim
      const response = await axios.post(
        "http://localhost:3000/api/items/claim",
        data
      );

      // Update the ticket status
      await axios.put(`http://localhost:3000/api/items/${currentTicket.id}`, {
        ticket: "success",
      });

      closeModal();
      fetchTickets();
      alert("Claim submitted successfully!");
    } catch (err) {
      console.error("Failed to submit claim:", err);
      alert("Failed to submit claim. Please try again.");
    }
  };

  // Dynamic Styling for Status and Category
  const statusColors = {
    lost: "bg-red-600 text-white",
    found: "bg-green-500 text-white",
    pending: "bg-yellow-500 text-white",
    success: "bg-green-500 text-white",
  };

  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 via-white to-gray-100">
      <Topbar />

      <main className="flex-grow py-10 px-6">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          ACTIVE TICKETS
        </h2>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            className="w-full max-w-2xl p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search tickets by name or description..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button
            className="px-6 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300"
            onClick={() => handleSearch({ target: { value: searchQuery } })}
          >
            🔍
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300" key={ticket.id}>
                <Link to={`/items/${ticket.id}`}>
                  <img
                    src={ticket.imageUrl || "/placeholder-image.png"}
                    alt={ticket.name}
                    className="w-full h-48 object-cover object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {ticket.name}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      <span className="font-semibold">Category:</span>{" "}
                      <span
                        className={`inline-block px-2 py-1 text-sm font-medium rounded ${statusColors[ticket.status]}`}
                      >
                        {ticket.status}
                      </span>
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold">Location:</span>{" "}
                      {ticket.location || "Not specified"}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold">Description:</span>{" "}
                      {ticket.description || "No description available"}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold">Reported on:</span>{" "}
                      {ticket.dateTime || "N/A"}
                    </p>
                  </div>
                </Link>
                
                <div className="p-6 pt-0">
                  <div className="flex space-x-2">
                    <button
                      className="flex-grow bg-green-500 text-white font-medium py-2 rounded hover:bg-green-600 transition duration-300"
                      onClick={() => openModal(ticket)}
                    >
                      MARK AS SUCCESS
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No active tickets found. Try adjusting your search.
            </p>
          )}
        </div>
      </main>

      <Footer />

      {modalOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-2xl text-center font-bold mb-6 text-blue-600">
            CLAIM OR FIND DETAILS
      </h3>

      {/* Upload Image Section */}
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

      {/* Input Fields */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Claimer's/Finder's Student ID
        </label>
        <input
          type="text"
          name="studentId"
          placeholder="Enter a Claimer's/Finder's Student ID"
          value={claimerDetails.studentId}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end justify-center space-x-2">
        <button
          onClick={closeModal}
          className="bg-gray-400 text-white w-25 px-12 py-2  rounded-lg hover:bg-gray-500 focus:outline-none"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-25 px-12 py-2  rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default ActiveTicket;
