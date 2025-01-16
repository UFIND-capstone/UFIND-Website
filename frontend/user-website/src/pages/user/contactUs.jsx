import React from 'react';
import Footer from '../../components/user/footer';
import Topbar from '../../components/user/topBar';

const ContactUs = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Topbar />

      {/* Full-width image below the top bar */}
      <div className="w-full">
        <img 
          src="/src/assets/CONTACT IMAGE.png" 
          alt="About Us Banner" 
          className="w-full h-65 object-cover"
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
              <p className="text-gray-700">We are located in OSA Bldg</p>
              <p className="text-sm text-gray-500">Our team is available to help you during these hours.</p>
            </div>
          </div>

          {/* Contact Section */}
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-center md:text-left">GET IN TOUCH</h3>
              <p className="text-gray-600 mb-6 text-center md:text-left">Have any questions? Let's connect through our social media!</p>
              <div className="flex justify-center space-x-8">
                {/* Facebook */}
                <a href="https://www.facebook.com/profile.php?id=61572131011000&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/src/assets/fb.png" // Replace with your Facebook logo image URL
                    alt="Facebook"
                    className="w-20 h-20"
                  />
                </a>
                {/* Gmail */}
                <a href="mailto:support@ufind.com">
                  <img
                    src="/src/assets/gmail.png" // Replace with your Gmail logo image URL
                    alt="Gmail"
                    className="w-20 h-20"
                  />
                </a>
                {/* WhatsApp */}
                <a href="https://x.com/rara_jared72862" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/src/assets/twitter.png" // Replace with your WhatsApp logo image URL
                    alt="WhatsApp"
                    className="w-20 h-20"
                  />
                </a>
              </div>
            </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
