import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is installed
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const UnclaimedTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch tickets from the backend where status is "Pending"
    axios.get("http://localhost:3000/api/items/status/pending") // Adjust based on your backend API
      .then(response => {
        console.log(response.data);
        setTickets(response.data);
      })
      .catch(error => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  // Dynamic Styling for Status and Category
  const statusColors = {
    Lost: "bg-gray-900 text-white",
    Found: "bg-blue-500 text-white",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Unclaimed Tickets
        </h2>

        {/* Ticket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tickets
  .filter((ticket) => ticket.ticket === "pending") // Filter for only "pending" status
  .map((ticket) => (
    <div
      key={ticket.id}
      className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden border-solid border-2 border-red-600"
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
              className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
                statusColors[ticket.status] || "bg-gray-400 text-white"
              }`}
            >
              {ticket.status}
            </span>
          </div>

          {/* Other Details */}
          <div>
            <label className="block text-sm font-semibold">
              Last Seen Location
            </label>
            <input
              type="text"
              value={ticket.location}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">
              Description
            </label>
            <input
              type="text"
              value={ticket.description}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">
              Date & Time
            </label>
            <input
              type="text"
              value={ticket.dateTime}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col space-y-4 mt-6">
          {/* Edit and Delete Buttons */}
          <div className="flex space-x-4">
            <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600">
              Edit
            </button>
            <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600">
              Delete
            </button>
          </div>

          {/* Status Button */}
          <button
            className={`w-full py-2 rounded-full font-semibold ${
              statusColors[ticket.status] || "bg-gray-400 text-white"
            }`}
          >
            {ticket.status}
          </button>
        </div>
      </div>
    </div>
  ))}

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UnclaimedTickets;
