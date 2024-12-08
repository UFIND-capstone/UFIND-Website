import React, { useState } from "react";
import { Link } from "react-router-dom";

const ActiveTicket = () => {
  const [search, setSearch] = useState("");

  // Sample ticket data
  const ActiveTicket = [
    {
      id: 1,
      itemName: "Water Bottle",
      fullName: "Frince Villarte",
      location: "Outside Cafeteria",
      description: "Dark Green bottle",
      dateTime: "June 24, 2024",
      image: "/path/to/image.png", // Replace with actual image path
    },
    // Add more ticket objects if needed
  ];

  // Filter tickets based on search input
  const filteredTickets = ActiveTicket.filter((ticket) =>
    ticket.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <div className="text-4xl font-bold">U-Find</div>
        <div className="flex items-center space-x-4">
          <button className="text-white">
            <i className="fas fa-bell"></i>
          </button>
          <img
            src="/src/assets/PROFILE.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/6 bg-white shadow-lg p-6">
          <div className="text-center mb-6">
            <img
              src="/src/assets/PROFILE.png"
              alt="Admin"
              className="w-16 h-16 mx-auto rounded-full"
            />
            <h2 className="mt-2 font-bold text-lg">Jared Rara</h2>
          </div>

          <nav>
            <ul className="space-y-4">
              <li className="hover:text-blue-500">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/itemLost">Item Lost</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/itemFound">Item Found</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/activeTicket">Active Tickets</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/turnoverTicket">Turnover Tickets</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/unclaimedTicket">Unclaimed Tickets</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/myAccount">My Account</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/">Logout</Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-6 text-center">ACTIVE TICKETS</h1>

          {/* Search Input */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Ticket List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
                >
                  <img
                    src={ticket.image}
                    alt={ticket.itemName}
                    className="w-full md:w-1/3 h-48 object-cover"
                  />
                  <div className="p-4 flex-1">
                    <h2 className="text-xl font-bold mb-2">{ticket.itemName}</h2>
                    <div className="text-gray-700 mb-1">
                      <strong>FULL NAME:</strong> {ticket.fullName}
                    </div>
                    <div className="text-gray-700 mb-1">
                      <strong>LAST SEEN LOCATION:</strong> {ticket.location}
                    </div>
                    <div className="text-gray-700 mb-1">
                      <strong>DESCRIPTION:</strong> {ticket.description}
                    </div>
                    <div className="text-gray-700 mb-4">
                      <strong>DATE & TIME:</strong> {ticket.dateTime}
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      DELETE
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No tickets found.</p>
            )}
          </div>
        </main>

        
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © U-Find Philippines 2024
      </footer>
    </div>
  );
};

export default ActiveTicket;
