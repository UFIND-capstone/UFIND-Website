import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UnclaimedTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hostUrl = import.meta.env.VITE_HOST_URL;
  const navigate = useNavigate();

  // Fetch tickets from the server
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${hostUrl}/api/items`);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const unclaimedTickets = response.data.filter((item) => {
          if (item.ticket === "pending") {
            const itemDate = new Date(item.dateTime.replace(" ", "T"));
            return itemDate < thirtyDaysAgo;
          }
          return false;
        });
        setTickets(unclaimedTickets);
        setFilteredTickets(unclaimedTickets);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch tickets");
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setFilteredItems(items); // Reset to all items if search is cleared
    } else {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      setFilteredItems(filtered);
    }
  };

  // Navigate to imgdesc page when clicking a ticket
  const handleTicketClick = (ticket) => {
    navigate(`/admin/items/${ticket.id}`, { state: { ticket } });
  };

  const reactivateItem = async (id) => {
    try {
      await axios.put(`${hostUrl}/api/items/${id}/reactivate`);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
      setFilteredTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (err) {
      setError("Failed to delete ticket");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            UNCLAIMED TICKETS
          </h1>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for an item..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-4 bg-blue-300 text-white rounded-r-lg hover:bg-blue-500">
              🔍
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredTickets.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-transform transform hover:-translate-y-1"
                  onClick={() => handleTicketClick(ticket)}
                >
                  <img
                    src={ticket.imageUrl || "/placeholder-image.png"}
                    alt={ticket.itemName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex-1">
                    <h2 className="text-xl font-bold mb-2">
                      {ticket.itemName}
                    </h2>
                    <p className="text-gray-700 mb-1">
                      <strong>Full Name:</strong> {ticket.fullName}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <strong>Description:</strong> {ticket.description}
                    </p>
                    <p className="text-gray-700 mb-4">
                      <strong>Date & Time:</strong> {ticket.dateTime}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering container click
                        reactivateItem(ticket.id);
                      }}
                      className="bg-green-500 text-white w-full px-4 py-2 rounded hover:bg-green-600"
                    >
                      REACTIVATE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No tickets found.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default UnclaimedTicket;
