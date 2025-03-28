import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from "../../components/user/topBar";
import Footer from "../../components/user/footer";
import { useAuth } from '../../AuthContext';

function NotificationUI() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth(); // Assuming user is provided from AuthContext

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return; // If user is not logged in, return early

      try {
        // Make the GET request with userId in the body
        const response = await axios.get('https://mel-backend.jwisnetwork.com/api/getNotifications', {
          params: { userId: user.id }
        });

        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [user]); // Re-run the effect if user changes (like login/logout)

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Topbar />
      <p className="text-gray-600 text-5xl px-30 py-10 font-bold text-center">NOTIFICATIONS</p>
      <div className="flex flex-wrap space-x-4 p-6 justify-between">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="w-full sm:w-1/3 p-6 border border-gray-300 rounded-lg bg-white shadow-md my-4">
              <p className="text-lg font-semibold text-gray-700">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-2">Claim Details: {notification.claimDetails.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notifications at the moment.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default NotificationUI;
