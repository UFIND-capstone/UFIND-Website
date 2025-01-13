import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../../components/user/topBar";
import Footer from "../../components/user/footer";
import axios from "axios";

const ActiveTicket = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [currentTicket, setCurrentTicket] = useState(null); // Current ticket for modal
  const [claimerDetails, setClaimerDetails] = useState({
    studentId: "",
    name: "",
    yearSection: "",
    contactNumber: "",
  });

  const navigate = useNavigate();

  // Function to fetch tickets
  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/items");
      const data = await response.json();
      const userTickets = data.filter(
        (item) => item.studentId === user.id && item.ticket !== "success" && item.claimStatus !== "turnover"
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

const handleSubmit = async () => {
  try {
    // Prepare the data to be submitted
    const data = {
      ...claimerDetails,
      itemId: currentTicket.id,
      studentId: user.id,
    };
    console.log("Submitting claim with data:", data);

    // Submit the claim
    const response = await axios.post(
      "http://localhost:3000/api/items/claim",
      data
    );

    // Update the ticket status to 'success' after successful claim submission
    await axios.put(`http://localhost:3000/api/items/${currentTicket.id}`, {
      ticket: "success",
    });

    // Close the modal and refresh the ticket list
    closeModal();
    fetchTickets();
    
    // Optionally handle the response (e.g., show a success message)
    alert("Claim submitted successfully!");
  } catch (err) {
    console.error("Failed to submit claim:", err);
    alert("Failed to submit claim. Please try again.");
  }
};



  // Dynamic Styling for Status and Category
  const statusColors = {
    Lost: "bg-gray-900 text-white",
    Found: "bg-blue-500 text-white",
    Pending: "bg-yellow-500 text-white",
    Matched: "bg-blue-500 text-white",
    Resolved: "bg-green-500 text-white",
    Rejected: "bg-red-500 text-white",
    Success: "bg-green-500 text-white",
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
                    className="h-50 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {ticket.name}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      <span className="font-semibold">Category:</span>{" "}
                      <span
                        className={`inline-block px-2 py-1 text-sm font-medium rounded ${statusColors[ticket.category]}`}
                      >
                        {ticket.category}
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
                      MARK AS COMPLETE
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl text-center font-bold mb-4">CLAIM OR FIND DETAILS</h3>
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
                className="w-full border border-gray-300 rounded p-2"
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
                className="w-full border border-gray-300 rounded p-2"
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
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="flex justify-end justify-center space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white w-25 px-12 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white w-25 px-14 py-2 rounded hover:bg-blue-600"
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
