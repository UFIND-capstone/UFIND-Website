// ContactUs.js
import React from 'react';

const ContactUs = () => {
  return (
    <div className="font-sans">
      {/* Header Section */}
      <div className="relative bg-cover bg-center h-64 flex items-center justify-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
        <h1 className="text-4xl font-bold text-white">CONTACT US</h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex justify-center space-x-8 py-4 bg-white shadow-md">
        <a href="#home" className="text-gray-800 hover:text-blue-600">HOME</a>
        <a href="#about" className="text-gray-800 hover:text-blue-600">ABOUT US</a>
        <a href="#contact" className="text-gray-800 hover:text-blue-600">CONTACT US</a>
      </nav>
      
      {/* Contact Information */}
      <div className="py-12 px-6 bg-gray-50 text-center md:flex md:justify-around">
        <div className="text-left max-w-md mx-auto mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-6">CONTACT US</h2>
          
          <div className="mb-6">
            <p className="text-lg font-semibold">E-MAIL ADDRESS:</p>
            <p className="text-gray-700">support@ufind.com</p>
            <p className="text-sm text-gray-500">Have a detailed question? Send us an email!</p>
          </div>
          
          <div className="mb-6">
            <p className="text-lg font-semibold">PHONE</p>
            <p className="text-gray-700">(123) 456-7890</p>
            <p className="text-sm text-gray-500">Need immediate assistance? Give us a call anytime</p>
          </div>
          
          <div>
            <p className="text-lg font-semibold">OFFICE HOURS:</p>
            <p className="text-gray-700">Monday – Friday | 9:00 AM – 5:00 PM</p>
            <p className="text-sm text-gray-500">Our team is available to help you during these hours.</p>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">GET IN TOUCH</h3>
          <p className="text-gray-600 mb-6">Have any questions? Let's get in touch!</p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              SUBMIT
            </button>
          </form>
        </div>
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
};

export default ContactUs;
