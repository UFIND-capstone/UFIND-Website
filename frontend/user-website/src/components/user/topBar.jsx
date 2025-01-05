import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, query, where, onSnapshot } from '../../config/firebase';
import { useAuth } from '../../AuthContext';

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState(0); // Count of new notifications
  const { user } = useAuth();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Fetch notifications in real-time
  useEffect(() => {
    if (!user) return; // Don't fetch if user is not authenticated

    const userId = user.id; // Get user ID from Auth Context

    // 1. Query the 'items' collection for items where userId matches the provided userId
    const itemsCollection = collection(db, 'items');
    const itemsQuery = query(itemsCollection, where('studentId', '==', userId));

    // 2. Listen for real-time updates
    const unsubscribeItems = onSnapshot(itemsQuery, (itemsSnapshot) => {
      if (itemsSnapshot.empty) {
        console.log('No items found for this user.');
        return;
      }

      // 3. Get the itemIds from the items that match the userId
      const itemIds = itemsSnapshot.docs.map(itemDoc => itemDoc.id);

      // 4. Query the 'Claim' collection for claims where itemId is in the itemIds
      const claimsCollection = collection(db, 'Claim');
      const claimsQuery = query(claimsCollection, where('itemId', 'in', itemIds));

      // 5. Listen for real-time updates on claims
      const unsubscribeClaims = onSnapshot(claimsQuery, (claimsSnapshot) => {
        if (claimsSnapshot.empty) {
          console.log('No claims found for this user.');
          return;
        }

        // 6. Combine matching claims and items into notifications
        const notifications = claimsSnapshot.docs.map(claimDoc => {
          const claimData = claimDoc.data();
          return {
            id: claimDoc.id,
            message: `Someone is trying to claim your item: ${claimData.name}`,
            claimDetails: claimData
          };
        });

        // 7. Set the notifications and count of new notifications
        setNotifications(notifications);
        setNewNotifications(notifications.length); // Assuming all are new
      });

      // Cleanup listener
      return () => {
        unsubscribeItems();
        unsubscribeClaims();
      };
    });

    // Cleanup listener when component unmounts
    return () => {
      unsubscribeItems();
    };
  }, [user]);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Link to="/dashboard" aria-label="Dashboard">
          <img src="/src/assets/LOGO.png" alt="U-Find Logo" className="h-8 w-8" />
        </Link>
        <span className="text-2xl font-bold text-blue-600">U-FIND</span>
      </div>

      <div className="flex space-x-8 text-gray-800">
        <Link to="/dashboard" className="hover:text-blue-600" aria-label="Home">HOME</Link>
        <Link to="/aboutUs" className="hover:text-blue-600" aria-label="About Us">ABOUT US</Link>
        <Link to="/contactUs" className="hover:text-blue-600" aria-label="Contact Us">CONTACT US</Link>

        <div className="relative">
          <button
            className="hover:text-blue-600 focus:outline-none"
            onClick={toggleDropdown}
            aria-label="View My Ticket"
          >
            MY TICKETS
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg z-10">
              <Link
                to="/activeTickets"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                Active Tickets
              </Link>
              <Link
                to="/completed"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                Completed Tickets
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Notification Icon */}
        <div className="relative">
          <Link to="/notification" aria-label="notification">
            <img
              src="/src/assets/notifs.png"
              alt="Notifications"
              className="h-5 w-5"
            />
            {newNotifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {newNotifications}
              </span>
            )}
          </Link>
        </div>

        <div>
          <Link to="/chatApp" aria-label="Messages">
            <img
              src="/src/assets/Mail.png"
              alt="Messages"
              className="h-10 w-10"
            />
          </Link>
        </div>

        <div>
          <Link to="/myAccount" aria-label="My Account">
            <img
              src="/src/assets/PROFILE.png"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}