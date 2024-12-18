import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import axios from "axios";

const ActiveTicket = () => {
  const { user } = useAuth(); // Access the user information from context
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch the tickets data from the API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/items");
        const data = await response.json();

        // Filter the tickets by matching studentId with user.id
        const userTickets = data.filter((item) => item.studentId === user.id && item.claimStatus !== 'turnover');
        setTickets(userTickets); // Update tickets state with filtered data
        setFilteredTickets(userTickets); // Set filteredTickets to the same initially
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [user.id]); // Re-fetch tickets if user.id changes

  // Handle search input changes
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = tickets.filter((ticket) =>
      ticket.name.toLowerCase().includes(query) ||
      ticket.description.toLowerCase().includes(query) ||
      ticket.category.toLowerCase().includes(query)
    );

    setFilteredTickets(filtered);
  };

  // Handle success (mark ticket as 'success')
  const handleSuccess = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/items/${id}`, { ticket: 'success' });
      // Update the item state locally
      setTickets(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, ticket: 'success' } : item
        )
      );
      setFilteredTickets(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, ticket: 'success' } : item
        )
      );
    } catch (err) {
      console.error('Failed to mark item as success:', err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${id}`);
      // Remove the deleted item from the state
      setTickets(prevItems => prevItems.filter(item => item.id !== id));
      setFilteredTickets(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete item:', err);
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
    Success: "bg-green-500 text-white",  // Added success status
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow py-10 px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          ACTIVE TICKETS
        </h2>

        {/* Search Bar */}
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-8">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-l-lg focus:outline-none"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="px-6 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
            🔍
          </button>
        </div>

        {/* Ticket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden"
              >
                {/* Image Section */}
                <div className="flex justify-center items-center bg-gray-200 p-4 md:w-1/2">
                  <img
                    src={ticket.imageUrl}
                    alt={`Image of ${ticket.name}`}
                    className="max-h-80 object-contain rounded"
                  />
                </div>

                {/* Details Section */}
                <div className="p-6 md:w-1/2">
                  <div className="flex flex-col space-y-4">
                    {/* Item Name and Category */}
                    <div>
                      <h3 className="font-bold text-lg">
                        {ticket.name.toUpperCase()}
                      </h3>
                      <span
                        className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${statusColors[ticket.category] || "bg-gray-400 text-white"}`}
                      >
                        {ticket.category}
                      </span>
                    </div>

                    {/* Other Details */}
                    <div>
                      <label className="block text-sm font-semibold">
                        Item Name
                      </label>
                      <span className="w-full p-2 border rounded-md bg-gray-50">
                        {ticket.name}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold">
                        Last Seen Location
                      </label>
                      <span className="w-full p-2 border rounded-md bg-gray-50">
                        {ticket.location}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold">
                        Description
                      </label>
                      <span className="w-full p-2 border rounded-md bg-gray-50">
                        {ticket.description}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold">
                        Date & Time
                      </label>
                      <span className="w-full p-2 border rounded-md bg-gray-50">
                        {ticket.dateTime}
                      </span>
                    </div>
                  </div>

                  {/* Buttons Section */}
                  <div className="flex flex-col space-y-4 mt-6">
                    {/* Success Button */}
                    <button
                      onClick={() => handleSuccess(ticket.id)}  // Attach handleSuccess
                      className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 flex-grow"
                    >
                      Mark as Complete
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(ticket.id)}  // Attach handleDelete
                      className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 flex-grow"
                    >
                      Delete
                    </button>

                    {/* Status Button */}
                    <button
                      className={`w-full py-2 rounded-full font-semibold ${statusColors[ticket.status] || "bg-gray-400 text-white"}`}
                    >
                      {ticket.status}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No tickets found.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ActiveTicket;
