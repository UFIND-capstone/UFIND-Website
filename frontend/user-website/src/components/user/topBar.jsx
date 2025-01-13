import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

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
              src="/src/assets/user.png"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
