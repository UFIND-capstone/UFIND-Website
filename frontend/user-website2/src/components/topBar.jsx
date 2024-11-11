export default function Topbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img src="/path/to/logo.png" alt="U-Find Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold text-blue-600">U-FIND</span>
      </div>
      
      {/* Navigation Links */}
      <div className="flex space-x-8 text-gray-800">
        <a href="#home" className="hover:text-blue-600">HOME</a>
        <a href="aboutUs.jsx" className="hover:text-blue-600">ABOUT US</a>
        <a href="#contact" className="hover:text-blue-600">CONTACT US</a>
      </div>
      
      {/* Profile Icon */}
      <div>
        <img src="/path/to/profile-icon.png" alt="Profile" className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};