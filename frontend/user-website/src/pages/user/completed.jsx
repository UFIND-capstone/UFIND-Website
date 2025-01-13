import React, { useState, useEffect } from "react";
import Topbar from "../../components/user/topBar";
import Footer from "../../components/user/footer";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom"; // Import Link here

const Completed = () => {
  const { user } = useAuth(); // Access the user information from context
  const [tickets, setTickets] = useState([]); // Holds the original list of tickets
  const [filteredTickets, setFilteredTickets] = useState([]); // Holds filtered list for display
  const [searchQuery, setSearchQuery] = useState(""); // Stores search query

  // Fetch the tickets data from the API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/items");
        const data = response.data;

        // Filter the tickets where ticket status is "success"
        const completedTickets = data.filter(
          (item) => item.ticket === "success"
        );

        setTickets(completedTickets); // Update tickets state with filtered data
        setFilteredTickets(completedTickets); // Initialize filteredTickets with the same list
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

    const filtered = tickets.filter(
      (ticket) =>
        ticket.name.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query) ||
        ticket.category.toLowerCase().includes(query)
    );

    setFilteredTickets(filtered); // Set the filtered tickets for display
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 via-white to-gray-100">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow py-10 px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          COMPLETED TICKETS
        </h2>

        {/* Search Bar */}
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-8">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-l-lg focus:outline-none"
            placeholder="Search tickets by name or description..."
            value={searchQuery} // Controlled input
            onChange={handleSearch} // Update search query on input change
          />
          <button
            className="px-6 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            onClick={() => console.log("Search triggered")}
          >
            🔍
          </button>
        </div>

        {/* Ticket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <Link to={`/items/${ticket.id}`}>
                  {/* Image */}
                  <div className="p-4 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 flex justify-center items-center">
                    <img
                      src={ticket.imageUrl || "/placeholder-image.png"}
                      alt={ticket.name}
                      className="h-40 w-40 object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-700 mb-2">
                      {ticket.name.toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">Category:</span>{" "}
                      {ticket.category || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">Location:</span>{" "}
                      {ticket.location || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">Description:</span>{" "}
                      {ticket.description || "No description provided"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Reported on:</span>{" "}
                      {ticket.dateTime || "N/A"}
                    </p>
                  </div>
                </Link>

                {/* Action */}
                <div className="p-4 bg-gray-100 flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    disabled
                  >
                    Found
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No completed tickets found.
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Completed;
