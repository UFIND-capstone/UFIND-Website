import React from 'react';
import LOGO from '/assets/LOGO.png'
import FB from '/assets/fb.png'
import Gmail from '/assets/gmail.png'
import Twitter from '/assets/twitter.png'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="flex justify-center md:justify-start items-center">
          <img
            src={LOGO} // Replace with your logo path
            alt="U-Find Logo"
            className="object-scale-down h-32 w-auto"
          />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">QUICK LINKS</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* First Column */}
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-sm hover:underline">Dashboard</a></li>
              <li><a href="/listLost" className="text-sm hover:underline">Report Item</a></li>
              <li><a href="/browseItemsLost" className="text-sm hover:underline">Browse Items</a></li>
            </ul>

            {/* Second Column */}
            <ul className="space-y-2">
              <li><a href="/aboutUs" className="text-sm hover:underline">About Us</a></li>
              <li><a href="/contactUs" className="text-sm hover:underline">Contact Us</a></li>
              <li><a href="/myAccount" className="text-sm hover:underline">My Account</a></li>
            </ul>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-3">RESOURCES</h3>
          <ul className="space-y-2">
            <li><a href="/howtoreportalostorfounditem" className="text-xs hover:underline">How to report a lost or found item?</a></li>
            <li><a href="/howtoprotectyourbelongings" className="text-xs hover:underline">How to Protect Your Belongings?</a></li>
            <li><a href="/whyisitimportanttosecureyourBelongings" className="text-xs hover:underline">Why is it important to secure your belongings?</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3">SOCIAL LINKS</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61572131011000&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <img src={FB} alt="Facebook" className="h-6" />
            </a>
            <a href="mailto:Jaredrara11@gmail.com" target="_blank" rel="noopener noreferrer">
              <img src={Gmail} alt="Gmail" className="h-6" />
            </a>
            <a href="https://x.com/rara_jared72862" target="_blank" rel="noopener noreferrer">
              <img src={Twitter} alt="X" className="h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-5 text-center">
        <p className="text-sm">&copy; TEAM U-FIND 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
