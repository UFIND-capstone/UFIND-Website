import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { debounce } from 'lodash';

const CompletedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 9; // Items per page

  const hostUrl = import.meta.env.VITE_HOST_URL;
  const navigate = useNavigate();

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${hostUrl}/api/items`);
      const unclaimedTickets = response.data.filter(
        (item) => item.ticket === "success"
      );
      setTickets(unclaimedTickets);
      setFilteredTickets(unclaimedTickets);
    } catch (err) {
      setError(err.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
    if (value === "") {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(
        (ticket) =>
          ticket.name.toLowerCase().includes(value.toLowerCase()) ||
          ticket.description?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTickets(filtered);
    }
    setCurrentPage(1); // Reset to the first page on search
  }, 300);

  const handleNavigateToDetails = (id) => {
    navigate(`/admin/items/complete/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${hostUrl}/api/tickets/${id}`);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
      setFilteredTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (err) {
      setError("Failed to delete ticket");
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">COMPLETED TICKETS</h1>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for an item..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
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
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
                    onClick={() => handleNavigateToDetails(ticket.id)}
                  >
                    <Link to={`/admin/items/complete/${ticket.id}`}>
                      <img
                        src={ticket.imageUrl || "/placeholder-image.png"}
                        alt={ticket.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 flex-1">
                        <h2 className="text-xl font-bold mb-2">{ticket.name}</h2>
                        <p className="text-gray-700 mb-1">
                          <strong>Full Name:</strong> {ticket.fullName}
                        </p>
                        <p className="text-gray-700 mb-1">
                          <strong>Description:</strong> {ticket.description}
                        </p>
                        <p className="text-gray-700 mb-4">
                          <strong>Date & Time:</strong> {ticket.dateTime}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 ${
                      currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    } rounded`}
                  >
                    {pageNumber}
                  </button>
                ))}
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

export default CompletedTickets;
