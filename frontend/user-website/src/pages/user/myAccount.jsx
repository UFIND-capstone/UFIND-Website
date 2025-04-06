import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Import AuthContext hook
import Topbar from "../../components/user/topBar";
import Footer from "../../components/user/footer";
import axios from "axios";
import UserImage from "../../assets/user.png"
export const MyAccount = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext

  const [profile, setProfile] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    contactNumber: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editedProfile, setEditedProfile] = useState(profile); // Editable profile data

  // Fetch the latest user profile from the server, with caching
  const fetchUserProfile = async () => {
    try {
      const cachedProfile = JSON.parse(localStorage.getItem("user"));
      if (cachedProfile && cachedProfile.id === user.id) {
        setProfile(cachedProfile);
        setEditedProfile(cachedProfile);
      } else {
        const response = await axios.get(`https://mel-backend.jwisnetwork.com/api/user/${user.id}`);
        setProfile(response.data); // Update profile with fresh data
        setEditedProfile(response.data); // Sync editable data
        localStorage.setItem("user", JSON.stringify(response.data)); // Cache profile data
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProfile(); // Fetch profile on component mount
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put("https://mel-backend.jwisnetwork.com/api/user/edit", {
        studentId: user.id,
        ...editedProfile, // Pass all edited fields
      });
      localStorage.setItem("user", JSON.stringify(editedProfile)); // Update cached profile
      await fetchUserProfile(); // Re-fetch updated profile
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile); // Revert to original profile
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout(); // Perform logout from AuthContext
    localStorage.removeItem("user"); // Clear cached profile
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
            <div className="flex justify-center mb-6">
              <img
                src={UserImage} // Update path if needed
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-800">
                <strong>Student ID:</strong>
                <span>{profile.id || "N/A"}</span>
              </div>
              <div className="flex justify-between text-gray-800">
                <strong>First Name:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editedProfile.firstName}
                    onChange={handleInputChange}
                    className="border rounded-md p-1 text-sm w-1/2"
                  />
                ) : (
                  <span>{profile.firstName || "N/A"}</span>
                )}
              </div>
              <div className="flex justify-between text-gray-800">
                <strong>Last Name:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editedProfile.lastName}
                    onChange={handleInputChange}
                    className="border rounded-md p-1 text-sm w-1/2"
                  />
                ) : (
                  <span>{profile.lastName || "N/A"}</span>
                )}
              </div>
              <div className="flex justify-between text-gray-800">
                <strong>Email Address:</strong>
                {isEditing ? (
                  <input
                    type="email"
                    name="emailAddress"
                    value={editedProfile.emailAddress}
                    onChange={handleInputChange}
                    className="border rounded-md p-1 text-sm w-1/2"
                  />
                ) : (
                  <span>{profile.emailAddress || "N/A"}</span>
                )}
              </div>
              <div className="flex justify-between text-gray-800">
                <strong>Contact Number:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="contactNumber"
                    value={editedProfile.contactNumber}
                    onChange={handleInputChange}
                    className="border rounded-md p-1 text-sm w-1/2"
                  />
                ) : (
                  <span>{profile.contactNumber || "N/A"}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="py-3 px-5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
