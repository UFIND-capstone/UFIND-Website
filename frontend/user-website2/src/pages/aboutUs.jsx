import React from 'react';
import Sidebar from '../components/footer';
import Topbar from '../components/topBar';

export const AboutUs = () => {
    return (
      <div className="font-sans">
        {/* Header Section */}
        <div className="relative bg-cover bg-center h-64 flex items-center justify-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
          <h1 className="text-4xl font-bold text-white">U-FIND</h1>
        </div>
            
        {/* Navigation */}
        <nav className="flex justify-center space-x-8 py-4 bg-white shadow-md">
          <a href="#home" className="text-gray-800 hover:text-blue-600">HOME</a>
          <a href="#about" className="text-gray-800 hover:text-blue-600">ABOUT US</a>
          <a href="#contact" className="text-gray-800 hover:text-blue-600">CONTACT US</a>
        </nav>
        
        {/* About Us Content */}
        <div className="text-center py-12 px-6 bg-gray-50">
          <h2 className="text-3xl font-semibold mb-4">ABOUT US</h2>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            U-Find is a user-friendly web and mobile platform designed to help students and staff report, track, and retrieve lost and found items on campus. Our system allows users to securely log in and report any lost or found items, making it easier for the rightful owners to be reunited with their belongings. With real-time notifications, users are quickly alerted whenever a match for their lost or found item is made.
          </p>
          <p className="mt-6 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Administrators can efficiently manage reports, ensuring that all cases are handled smoothly. Our goal is to create a seamless and convenient experience for the campus community, helping lost items find their way back to their owners in a secure and timely manner.
          </p>
        </div>
        
        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-center py-8 px-6 bg-blue-600 text-white">
          {/* About Section */}
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">ABOUT US</h3>
            <p className="text-sm">
              U-Find is a web and mobile platform for reporting, tracking, and retrieving lost and found items on campus. Secure authentication and real-time notifications help quickly reunite lost items with their owners, while admins efficiently manage reports.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-gray-300">Twitter</a>
              <a href="#" className="hover:text-gray-300">Facebook</a>
              <a href="#" className="hover:text-gray-300">Instagram</a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="text-sm mt-8 md:mt-0">
            <h3 className="text-lg font-semibold mb-2">CONTACT INFO</h3>
            <p>Claro M. Recto Avenue, Lapasan</p>
            <p>9000 Cagayan de Oro City, Philippines</p>
            <p>+639295832504</p>
          </div>
        </footer>
        
        {/* Footer Copyright */}
        <div className="bg-gray-800 text-center text-white py-4 text-xs">
          © U-FIND PHILIPPINES 2024
        </div>
      </div>
    );
  }