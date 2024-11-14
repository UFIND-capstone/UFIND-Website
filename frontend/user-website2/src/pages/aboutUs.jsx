import React from 'react';
import Footer from '../components/footer';
import Topbar from '../components/topBar';

const aboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Topbar />

      {/* Full-width image below the top bar */}
      <div className="w-full">
        <img 
          src="/src/assets/ABOUT IMAGE.png" 
          alt="About Us Banner" 
          className="w-full h-65 object-cover"
        />
      </div>

      <section className="text-center py-12 px-6">
        <h2 className="text-3xl font-semibold mb-4">ABOUT US</h2>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed mb-6">
          U-Find is a user-friendly web and mobile platform designed to help students and staff report, track, and retrieve lost and found items on campus. Our system allows users to securely log in and report any lost or found items, making it easier for the rightful owners to be reunited with their belongings. With real-time notifications, users are quickly alerted whenever a match for their lost or found item is made.
        </p>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Administrators can efficiently manage reports, ensuring that all cases are handled smoothly. Our goal is to create a seamless and convenient experience for the campus community, helping lost items find their way back to their owners in a secure and timely manner.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default aboutUs;
