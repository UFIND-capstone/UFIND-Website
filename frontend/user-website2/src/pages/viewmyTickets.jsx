import React from "react";
import Topbar from "../components/topBar";
import Footer from "../components/footer";

const ViewMyTickets = () => {
  // Array of ticket data for multiple items
  const tickets = [
    {
      id: 1,
      name: "Aquaflask",
      category: "Lost", // New field for category
      lastSeenLocation: "Inside Cafeteria Table",
      description: "Color Purple and 40oz",
      dateTime: "November 25, 2024 - 12:50 PM",
      status: "Pending",
      image: "src/assets/aquaflask.png", // Replace with actual image paths
    },
    {
      id: 2,
      name: "Umbrella",
      category: "Found", // New field for category
      lastSeenLocation: "Library",
      description: "Black with white handle",
      dateTime: "November 24, 2024 - 10:30 AM",
      status: "Matched",
      image: "src/assets/aquaflask.png",
    },
  ];

  // Dynamic Styling for Status and Category
  const statusColors = {
    Lost: "bg-gray-900 text-white",
    Found: "bg-gray-900 text-white",
    Pending: "bg-yellow-500 text-white",
    Matched: "bg-blue-500 text-white",
    Resolved: "bg-green-500 text-white",
    Rejected: "bg-red-500 text-white",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100" >
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          View My Tickets
        </h2>

        {/* Ticket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden border-solid border-2 border-red-600"
            >
              {/* Image Section */}
              <div className="flex justify-center items-center bg-gray-200 p-4 md:w-1/2">
                <img
                  src={ticket.image}
                  alt={`Image of ${ticket.name}`}
                  className="max-h-80 object-contain rounded"
                />
              </div>

              {/* Details Section */}
              <div className="p-6 md:w-1/2">
                <div className="flex flex-col space-y-4">
                  {/* Item Name and Category */}
                  <div>
                    <h3 className="font-bold text-lg">{ticket.name.toUpperCase()}</h3>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
                        statusColors[ticket.category] || "bg-gray-400 text-white"
                      }`}
                    >
                      {ticket.category}
                    </span>
                  </div>

                  {/* Other Details */}
                  <div>
                    <label className="block text-sm font-semibold">Item Name</label>
                    <input
                      type="text"
                      value={ticket.name}
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold">
                      Last Seen Location
                    </label>
                    <input
                      type="text"
                      value={ticket.lastSeenLocation}
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold">Description</label>
                    <input
                      type="text"
                      value={ticket.description}
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold">Date & Time</label>
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
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 flex-grow">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 flex-grow">
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

export default ViewMyTickets;
