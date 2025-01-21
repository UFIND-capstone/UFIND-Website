import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UnclaimedTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 15; // Define how many items per page
  const hostUrl = import.meta.env.VITE_HOST_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async (email, subject, message) => {
    try {
      const response = await axios.post("http://localhost:3000/send-email", {
        email,
        subject,
        message,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

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

    if (value === "") {
      setFilteredTickets(tickets); // Reset to all tickets if search is cleared
    } else {
      const filtered = tickets.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      setFilteredTickets(filtered);
    }

    setCurrentPage(1); // Reset to first page on search
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

  // Calculate the items to display based on the current page
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

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
          ) : currentTickets.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentTickets.map((ticket) => (
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering container click
                          const message = `is this item still active?\nitem id:\n${ticket.id}`;
                          sendEmail(ticket.email, "reminder", message);
                        }}
            
                        className="bg-red-500 text-white w-full px-4 py-2 rounded hover:bg-green-600"
                      >
                        REMIND USER
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 ${
                        currentPage === pageNumber
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      } rounded`}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
              </div>
            </>
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
