import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-10 px-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">ABOUT US</h3>
          <p className="text-sm">
            U-Find is a web and mobile platform for reporting, tracking, and retrieving lost and found items on campus. Secure authentication and real-time notifications help quickly reunite lost items with their owners, while admins efficiently manage reports.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-300" aria-label="Twitter">Twitter</a>
            <a href="#" className="hover:text-gray-300" aria-label="Facebook">Facebook</a>
            <a href="#" className="hover:text-gray-300" aria-label="Instagram">Instagram</a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">CONTACT INFO</h3>
          <p>Claro M. Recto Avenue, Lapasan</p>
          <p>9000 Cagayan de Oro City, Philippines</p>
          <p>+639295832504</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-white mt-8">
        © U-FIND PHILIPPINES 2024
      </div>
    </footer>
  );
}
