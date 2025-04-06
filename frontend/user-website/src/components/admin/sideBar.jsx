import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Import AuthContext hook
import {
  MdDashboard,
  MdOutlineSearch,
  MdOutlineAssignmentTurnedIn,
  MdOutlineListAlt,
  MdAccountCircle,
  MdLogout,
} from "react-icons/md";
import { RiTicketLine, RiUserSettingsLine, RiCheckboxCircleLine } from "react-icons/ri";
import { AiOutlineFileSearch } from "react-icons/ai"; // New icons
import OSAimage from '/assets/OSA.png'

const Sidebar = () => {
  const { logout } = useAuth(); // Get user and logout function from AuthContext
  const navigate = useNavigate(); // For navigation after logout

  // Logout handler function
  const handleLogout = () => {
    logout(); // Perform logout from AuthContext
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="h-full w-70 bg-gradient-to-b from-blue-600 to-blue-500 text-white shadow-lg flex flex-col">
      {/* Logo and Profile */}
      <div className="p-6 text-center border-b border-blue-400">
        <div className="flex justify-center mb-4">
          <img
            src={OSAimage} // Replace with actual profile image path
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <h2 className="text-lg font-bold">ADMINISTRATOR</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 overflow-y-auto">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin/dashboard"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <MdDashboard size={24} />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/activeTicketAdmin"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <MdOutlineListAlt size={24} />
              <span>Active Tickets</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/completedTickets"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <RiCheckboxCircleLine size={24} />
              <span>Completed Tickets</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/unclaimedTicket"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <RiTicketLine size={24} />
              <span>Unclaimed Tickets</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/userManagement"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <RiUserSettingsLine size={24} />
              <span>Manage Users</span>
            </NavLink>
          </li>

          {/* Logout Link */}
          <li>
            <button
              onClick={handleLogout} // Trigger the logout function
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-red-600 transition w-full text-left"
            >
              <MdLogout size={24} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
