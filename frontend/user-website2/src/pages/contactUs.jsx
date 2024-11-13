import React from 'react';
import Footer from '../components/footer';
import Topbar from '../components/topBar';

const ContactUs = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Topbar />

      {/* Full-width image below the top bar */}
      <div className="w-full">
        <img 
          src="/src/assets/U-FIND (3).png" 
          alt="About Us Banner" 
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow py-12 px-6 bg-gray-50">
        <div className="container mx-auto md:flex md:space-x-10 md:justify-center">

          {/* Contact Information */}
          <div className="text-left max-w-md mb-10 md:mb-0 md:text-left">
            <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">CONTACT US</h2>
            
            <div className="mb-6">
              <p className="text-lg font-semibold">E-MAIL ADDRESS:</p>
              <p className="text-gray-700">support@ufind.com</p>
              <p className="text-sm text-gray-500">Have a detailed question? Send us an email!</p>
            </div>
            
            <div className="mb-6">
              <p className="text-lg font-semibold">PHONE</p>
              <p className="text-gray-700">(123) 456-7890</p>
              <p className="text-sm text-gray-500">Need immediate assistance? Give us a call anytime.</p>
            </div>
            
            <div>
              <p className="text-lg font-semibold">OFFICE HOURS:</p>
              <p className="text-gray-700">Monday – Friday | 9:00 AM – 5:00 PM</p>
              <p className="text-sm text-gray-500">Our team is available to help you during these hours.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center md:text-left">GET IN TOUCH</h3>
            <p className="text-gray-600 mb-6 text-center md:text-left">Have any questions? Let's get in touch!</p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Message"
                rows="4"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
