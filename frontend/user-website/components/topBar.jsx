import React from 'react';
import { Link } from 'react-router-dom';

const TopNavigation = () => {
  return (
    <nav className="flex items-center justify-between bg-white py-4 px-8 shadow-md">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-2">
        <img 
          src="/path-to-logo-icon.png" 
          alt="U-Find Logo" 
          className="w-8 h-8" 
        />
        <Link to="/" className="text-2xl font-bold text-blue-600">
          U-FIND
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <div className="flex space-x-8 text-lg font-semibold text-gray-800">
        <Link to="/" className="hover:text-blue-600">
          HOME
        </Link>
        <Link to="/about-us" className="hover:text-blue-600">
          ABOUT US
        </Link>
        <Link to="/contact-us" className="hover:text-blue-600">
          CONTACT US
        </Link>
      </div>

      {/* Right side - Profile Icon */}
      <div>
        <img 
          src="/path-to-profile-icon.png" 
          alt="Profile Icon" 
          className="w-10 h-10 rounded-full border border-gray-200"
        />
      </div>
    </nav>
  );
};

export default TopNavigation;
