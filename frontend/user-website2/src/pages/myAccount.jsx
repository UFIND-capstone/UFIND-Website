import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import AuthContext hook
import Topbar from "../components/topBar";
import Footer from "../components/footer";

export const MyAccount = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext

  const [profile, setProfile] = useState({
    firstName: "",
    emailAddress: "",
    contactNumber: "",
    username: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        emailAddress: user.emailAddress || "",
        contactNumber: user.contactNumber || "",
        username: user.username || "",
      });
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  // Function to handle logout
  const handleLogout = () => {
    logout(); // Perform logout from AuthContext
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="flex">
      <div className="w-full">
        <Topbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-400 p-10">
          <h1 className="text-4xl text-white font-bold text-center mb-10">
            MY ACCOUNT
          </h1>
          <div className="max-w-lg mx-auto bg-white p-10 rounded-lg shadow-lg">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <img
                src="/src/assets/PROFILE.png" // Update path if needed
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md"
              />
            </div>

            {/* Name and Email */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {profile.firstName}
              </h2>
              <p className="text-gray-600">{profile.emailAddress}</p>
            </div>

            {/* Account Details */}
            <div className="space-y-4">
              <div className="flex justify-between text-gray-800">
                <strong>Username:</strong>
                <span>{profile.username || "N/A"}</span>
              </div>
              <div className="flex justify-between text-gray-800">
                <strong>Email Address:</strong>
                <span>{profile.emailAddress || "N/A"}</span>
              </div>
              <div className="flex justify-between text-gray-800">
                <strong>Contact Number:</strong>
                <span>{profile.contactNumber || "N/A"}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {/* View My Tickets */}
              <button
                onClick={() => navigate("/viewmytickets")}
                className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                View My Tickets
              </button>

              {/* Unclaimed Tickets */}
              <button
                onClick={() => navigate("/unclaimedtickets")}
                className="py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Unclaimed Tickets
              </button>

              {/* Edit Profile */}
              <button
                onClick={() => navigate("/editprofile")}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Edit Profile
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
