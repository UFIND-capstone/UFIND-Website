import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { useAuth } from "../AuthContext"; // Import the custom hook
import imagee from "../assets/imagee.jpg";

export default function Sidebar() {
  const navigate = useNavigate(); // Initialize useNavigate
  const { logout } = useAuth(); // Get the logout function from context

  const handleLogout = () => {
    logout(); // Call logout function
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-950 to-blue-500 text-white min-h-screen w-64">
      <div className="profile border-red-900 flex flex-col items-center p-4">
        <img className="w-24 h-24 object-cover rounded-full" src={imagee} alt="User Profile" />
        <h1 className="text-2xl font-bold mt-2">User Name</h1>
      </div>
      <ul className="flex flex-col font-medium w-full">
        <li className="p-4 hover:bg-blue-700">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="p-4 hover:bg-blue-700">
          <Link to="/lost-items">Lost Items</Link>
        </li>
        <li className="p-4 hover:bg-blue-700">
          <Link to="/found-items">Found Items</Link>
        </li>
        <li className="p-4 hover:bg-blue-700">
          <Link to="/match-items">Match Items</Link> {/* Use Link for navigation */}
        </li>
        <li className="p-4 hover:bg-blue-700">
          <Link to="/unclaimed-tickets">Unclaimed Ticket</Link> {/* Use Link for navigation */}
        </li>
        <li className="p-4 hover:bg-blue-700">
          <Link to="/my-account">My Account</Link> {/* Use Link for navigation */}
        </li>
        <li className="p-4 hover:bg-blue-700 cursor-pointer" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
}