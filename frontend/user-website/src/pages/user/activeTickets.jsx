import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Topbar from "../../components/user/topBar";
import Footer from "../../components/user/footer";
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
        const userTickets = data.filter(
          (item) => item.studentId === user.id && item.claimStatus !== "turnover"
        );
        setTickets(userTickets); // Update tickets state with filtered data
        setFilteredTickets(userTickets); // Set filteredTickets to the same initially
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

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

  // Handle success (mark ticket as 'success')
  const handleSuccess = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/items/${id}`, { ticket: "success" });
      setTickets((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ticket: "success" } : item
        )
      );
      setFilteredTickets((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ticket: "success" } : item
        )
      );
    } catch (err) {
      console.error("Failed to mark item as success:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${id}`);
      setTickets((prevItems) => prevItems.filter((item) => item.id !== id));
      setFilteredTickets((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
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
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow py-10 px-6">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Active Tickets
        </h2>

        {/* Search Bar */}
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


        {/* Ticket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <Link>
              <div
                to={`/ImageDescription/${ticket.id}`} // Navigate to the ticket's detailed page
                key={ticket.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
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

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSuccess(ticket.id)}
                      className="flex-grow bg-green-500 text-white font-medium py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                      Mark as Complete
                    </button>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="flex-grow bg-red-500 text-white font-medium py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No active tickets found. Try adjusting your search.
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ActiveTicket;
