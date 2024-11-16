import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-8 font-sans">
      {/* Footer Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-9 px-1">
        {/* Column 1: Logo and Social Links */}
        <div className="flex flex-col items-center md:items-start">
          {/* Logo */}
          <img
            src="/src/assets/logo.png" // Replace with your actual logo source
            alt="System Logo"
            className="w-40 h-40 mb-4"
          />
        </div>

        {/* Column 2: Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/dashboard"
                className="hover:underline text-sm transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/aboutUs"
                className="hover:underline text-sm transition duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contactUs"
                className="hover:underline text-sm transition duration-300"
              >
                Contact Info
              </a>
            </li>
            <li>
              <a
                href="/listLost"
                className="hover:underline text-sm transition duration-300"
              >
                Browse Items (Lost)
              </a>
            </li>
            <li>
              <a
                href="/listFound"
                className="hover:underline text-sm transition duration-300"
              >
                Report Items (Found)
              </a>
            </li>
            <li>
              <a
                href="/myAccount"
                className="hover:underline text-sm transition duration-300"
              >
                My Account
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:underline text-sm transition duration-300"
              >
                How to report a lost or found item
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline text-sm transition duration-300"
              >
                How to Protect Your Belongings
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-3 border-t border-white pt-4 text-center">
        <p className="text-xs">© U-FIND PHILIPPINES 2024</p>
      </div>
    </footer>
  );
}
