import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Topbar() {
  // State for managing dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown menu visibility
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo Section with Link to Dashboard */}
      <div className="flex items-center space-x-2">
        <Link to="/dashboard" aria-label="Dashboard">
          <img src="/src/assets/LOGO.png" alt="U-Find Logo" className="h-8 w-8" />
        </Link>
        <span className="text-2xl font-bold text-blue-600">U-FIND</span>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-gray-800">
        <Link to="/dashboard" className="hover:text-blue-600" aria-label="Home">HOME</Link>
        <Link to="/aboutUs" className="hover:text-blue-600" aria-label="About Us">ABOUT US</Link>
        <Link to="/contactUs" className="hover:text-blue-600" aria-label="Contact Us">CONTACT US</Link>
        
        {/* View My Ticket with Dropdown */}
        <div className="relative">
          <button
            className="hover:text-blue-600 focus:outline-none"
            onClick={toggleDropdown}
            aria-label="View My Ticket"
          >
            TICKETS
          </button>
          
          {/* Dropdown Menu */}
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
                to="/turnover"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                Turnover
              </Link>
              <Link
                to="/unclaimedTickets"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                Unclaimed Tickets
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Icons Section */}
      
      <div className="flex items-center space-x-3">

        {/* Notification Icon */}
        <div>
          <Link to="/notification" aria-label="notification">
            <img
              src="/src/assets/notifs.png" // Replace with your mail icon path
              alt="Mail"
              className="h-5 w-5" // Adjust size of mail icon
            />
          </Link>
        </div>

        <div>
          <Link to="/messages" aria-label="Messages">
            <img
              src="/src/assets/Mail.png" // Replace with your mail icon path
              alt="Mail"
              className="h-10 w-10" // Adjust size of mail icon
            />
          </Link>
        </div>

        {/* Profile Icon with Link to My Account */}
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
