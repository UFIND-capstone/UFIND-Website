import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
            <a href="#">Dashboard</a>
        </li>
        <li className="p-4 hover:bg-blue-700">
            <a href="#">Lost Items</a>
        </li>
        <li className="p-4 hover:bg-blue-700">
            <a href="#">Found Items</a>
        </li>
        <li className="p-4 hover:bg-blue-700">
            <a href="#">Match Items</a>
        </li>
        <li className="p-4 hover:bg-blue-700">
            <a href="#">Unclaimed Ticket</a>
        </li>
        <li className="p-4 hover:bg-blue-700">
            <a href="#">My Account</a>
        </li>
        <li className="p-4 hover:bg-blue-700 cursor-pointer" onClick={handleLogout}>
            Logout
        </li>
      </ul>
    </div>
  );
}