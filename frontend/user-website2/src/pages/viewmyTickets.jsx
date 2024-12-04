import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { useAuth } from "../AuthContext"; // Import AuthContext to get user ID

const ViewMyTickets = () => {
  const { user } = useAuth(); // Authenticated user's context
  const [items, setItems] = useState([]); // State to store fetched items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!user || !user.id) {
      setError("User ID is not available.");
      return;  // Exit early if user.id is not available
    }
  
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/items/user/${user.id}`
        );
        if (response.status === 200) {
          setItems(response.data);
        } else {
          setError("Unexpected server response");
        }
      } catch (err) {
        setError("Failed to fetch items");
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchItems();
  }, [user]);  // Ensure user is ready before making the request
  
  
  

  // Dynamic Styling for Ticket Status
  const ticketColors = {
    pending: "bg-yellow-500 text-white",
    matched: "bg-blue-500 text-white",
    resolved: "bg-green-500 text-white",
    rejected: "bg-red-500 text-white",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          View My Tickets
        </h2>

        {items.length > 0 ? (
  items.map((item) => (
    <div
      key={item.id}
      className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden border border-gray-300"
    >
      {/* Image Section */}
      <div className="flex justify-center items-center bg-gray-200 p-4 md:w-1/2">
        <img
          src={item.imageUrl}
          alt={`Image of ${item.name}`}
          className="max-h-80 object-contain rounded"
        />
      </div>

      {/* Details Section */}
      <div className="p-6 md:w-1/2">
        <div className="flex flex-col space-y-4">
          <h3 className="font-bold text-lg">{item.name.toUpperCase()}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <div>
            <label className="block text-sm font-semibold">Location</label>
            <p className="text-gray-800">{item.location}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Date & Time</label>
            <p className="text-gray-800">{item.dateTime}</p>
          </div>
          <div
            className={`py-2 px-4 rounded-full font-semibold ${
              ticketColors[item.ticket.toLowerCase()] || "bg-gray-400 text-white"
            }`}
          >
            {item.ticket.toUpperCase()}
          </div>
        </div>
        <div className="mt-6">
          {item.ticket.toLowerCase() === "pending" ? (
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
              <p>This ticket is still pending.</p>
            </div>
          ) : item.ticket.toLowerCase() === "matched" ? (
            <div className="bg-blue-100 text-blue-800 p-4 rounded-md">
              <p>This ticket has been matched!</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  ))
) : (
  <p className="text-center text-gray-600">
    No tickets found. Create your first ticket to get started!
  </p>
)}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ViewMyTickets;
