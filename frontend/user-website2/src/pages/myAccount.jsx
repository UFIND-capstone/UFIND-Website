import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import AuthContext hook
import Topbar from '../components/topBar';
import Footer from '../components/footer';

export const MyAccount = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext

  const [profile, setProfile] = useState({
    firstName: '',
    emailAddress: '',
    contactNumber: '',
  });

  useEffect(() => {
    console.log('User:', user);
    if (user) {
      setProfile({
        firstName: user.firstName || '',
        emailAddress: user.emailAddress || '',
        contactNumber: user.contactNumber || '',
      });
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  // Function to handle logout
  const handleLogout = () => {
    logout(); // Perform logout from AuthContext
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="flex">
      <div className="w-full">
        <Topbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-400 p-10">
          <h1 className="text-4xl text-white font-bold text-center mb-10">MY ACCOUNT</h1>
          <div className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow-lg">
            <div className="flex justify-center mb-6">
              <img
                src="/src/assets/PROFILE.png"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md"
              />
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{profile.firstname}</h2>
              <p className="text-gray-600 mb-2">{profile.emailAddress}</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <strong>First Name:</strong> {profile.firstName}
              </div>
              <div className="flex justify-between text-gray-600">
                <strong>Email Address:</strong> {profile.emailAddress}
              </div>
              <div className="flex justify-between text-gray-600">
                <strong>Contact Number:</strong> {profile.contactNumber || 'N/A'}
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="py-2 px-6 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
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
