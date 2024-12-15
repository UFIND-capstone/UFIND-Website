import React, { useState } from "react";
import Sidebar from '../components/sideBar';
import Topbar from '../components/topBar';

const ActiveTicket = () => {
  const [search, setSearch] = useState("");

  // Manually entered active tickets
  const tickets = [
    {
      id: 1,
      itemName: "Water Bottle",
      fullName: "Frince Villarte",
      location: "Outside Cafeteria",
      description: "Dark Green bottle",
      dateTime: "June 24, 2024",
      image: "/src/assets/tumbler.jpg", // Replace with actual image path
    },
    {
      id: 2,
      itemName: "Backpack",
      fullName: "John Doe",
      location: "Library",
      description: "Blue backpack with books",
      dateTime: "June 25, 2024",
      image: "/src/assets/backpack.png", // Replace with actual image path
    },
    {
      id: 3,
      itemName: "Umbrella",
      fullName: "Jane Smith",
      location: "Hallway",
      description: "Red umbrella with white spots",
      dateTime: "June 26, 2024",
      image: "/src/assets/umbrella.png", // Replace with actual image path
    },
  ];

  // Filter tickets based on search input
  const filteredTickets = tickets.filter((ticket) =>
    ticket.itemName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">ACTIVE TICKETS</h1>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search tickets"
              className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Ticket Containers */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <img
                    src={ticket.image}
                    alt={ticket.itemName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex-1">
                    <h2 className="text-xl font-bold mb-2">{ticket.itemName}</h2>
                    <p className="text-gray-700 mb-1">
                      <strong>Full Name:</strong> {ticket.fullName}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <strong>Last Seen Location:</strong> {ticket.location}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <strong>Description:</strong> {ticket.description}
                    </p>
                    <p className="text-gray-700 mb-4">
                      <strong>Date & Time:</strong> {ticket.dateTime}
                    </p>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      DELETE
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No tickets found.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActiveTicket;
