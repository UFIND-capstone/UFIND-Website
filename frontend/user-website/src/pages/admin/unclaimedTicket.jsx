import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UnclaimedTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [reminderTickets, setReminderTickets] = useState([]);
  const [unclaimedTickets, setUnclaimedTickets] = useState([]);
  const [currentTab, setCurrentTab] = useState("reminders"); // Active tab: "reminders" or "unclaimed"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hostUrl = import.meta.env.VITE_HOST_URL;
  const navigate = useNavigate();

  const sendEmail = async (email, subject, message) => {
    try {
      const response = await axios.post(`${hostUrl}/send-email`, {
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
        const now = new Date();
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(now.getDate() - 15);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        const reminders = response.data.filter((item) => {
          const itemDate = new Date(item.dateTime.replace(" ", "T"));
          return (
            item.ticket === "pending" &&
            itemDate <= fifteenDaysAgo &&
            itemDate > thirtyDaysAgo
          );
        });

        const unclaimed = response.data.filter((item) => {
          const itemDate = new Date(item.dateTime.replace(" ", "T"));
          return item.ticket === "pending" && itemDate <= thirtyDaysAgo;
        });

        setReminderTickets(reminders);
        setUnclaimedTickets(unclaimed);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch tickets");
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleTicketClick = (ticket) => {
    navigate(`/admin/items/${ticket.id}`, { state: { ticket } });
  };

  const reactivateItem = async (id) => {
    try {
      await axios.put(`${hostUrl}/api/items/${id}/reactivate`);
      setUnclaimedTickets((prev) =>
        prev.filter((ticket) => ticket.id !== id)
      );
    } catch (err) {
      setError("Failed to reactivate ticket");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            UNCLAIMED TICKETS MANAGEMENT
          </h1>

          {/* Tabs for switching between sections */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded ${
                currentTab === "reminders"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentTab("reminders")}
            >
              Reminders
            </button>
            <button
              className={`px-4 py-2 rounded ${
                currentTab === "unclaimed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentTab("unclaimed")}
            >
              Unclaimed Tickets
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : currentTab === "reminders" ? (
            // Reminder Tickets Section
            reminderTickets.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reminderTickets.map((ticket) => (
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
                      <p className="text-gray-700 mb-4">
                        <strong>Date & Time:</strong> {ticket.dateTime}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering container click
                          const message = `Hey ......

Just a heads-up about your lost item in our system.

Item Details:

Item ID: ${ticket.id}
Description: ${ticket.description}
Make sure to update the status of your item in your account. If we don't hear from you in the next 15 days, we'll have to archive it.

Hop onto your account and let us know what's up!

Thanks!

UFIND Team`;
                          sendEmail(ticket.email, "Quick Reminder: Update Your Lost Item Status", message);
                        }}
                        className="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600"
                      >
                        SEND REMINDER
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No items requiring reminders.
              </p>
            )
          ) : (
            // Unclaimed Tickets Section
            unclaimedTickets.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {unclaimedTickets.map((ticket) => (
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
              <p className="text-center text-gray-500">
                No unclaimed tickets found.
              </p>
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default UnclaimedTicket;
