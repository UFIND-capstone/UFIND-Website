import React from 'react';
import Footer from '../../components/user/footer';
import Topbar from '../../components/user/topBar';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Topbar />

      {/* Banner Image */}
      <div className="w-full">
        <img
          src="/src/assets/ABOUT IMAGE.png"
          alt="About Us Banner"
          className="w-full h-65 object-cover"
        />
      </div>

      {/* About Us Section */}
      <section className="py-12 px-6 bg-white text-gray-700">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
            ABOUT US
          </h2>

          <p className="max-w-6xl mx-auto text-gray-700 text-justify leading-relaxed mb-6">
          U-Find is a user-friendly web and mobile platform designed to help students and staff report, track, and retrieve lost and found items on campus. Our system allows users to securely log in and report any lost or found items, making it easier for the rightful owners to be reunited with their belongings. With real-time notifications, users are quickly alerted whenever a match for their lost or found item is made.
        </p>

        <p className="max-w-6xl mx-auto text-gray-700 text-justify leading-relaxed">
          Administrators can efficiently manage reports, ensuring that all cases are handled smoothly. Our goal is to create a seamless and convenient experience for the campus community, helping lost items find their way back to their owners in a secure and timely manner.
        </p>

        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-7 px-7 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-center max-w-6xl mx-auto text-gray-700 leading-relaxed mb-10">
            At U-Find, we are committed to creating a trusted and efficient solution that ensures lost belongings are quickly reunited with their owners. We strive to build a community of collaboration and care while simplifying the lost-and-found process for everyone.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-6">
            Key Features
          </h3>
          <ul className="text-base pl-8 list-disc text-gray-700 leading-relaxed space-y-3">
            <li> <b> Real-Time Messaging: </b> Be the first to know when a match is made for your reported item.</li>
            <li> <b> User-Friendly Dashboard: </b> Navigate with ease to manage your lost and found reports.</li>
            <li> <b> Smart Search and Filters: </b> Find items faster with advanced search capabilities and category filters.</li>
            <li> <b> Dedicated Admin Tools: </b> Campus administrators can efficiently oversee and manage all reports to ensure smooth operations.</li>
            <li> <b> Secure Access: </b> Protect user data and item information with basic security protocols.</li>
          </ul>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Meet the Team
        </h2>
        <p className="text-center max-w-6xl mx-auto text-gray-700 leading-relaxed mb-10">
          Our team is dedicated to making U-Find the most reliable lost-and-found platform. From developers to researchers, each member contributes their expertise and passion to ensure our platform serves the campus community effectively.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white shadow-xl border-solid border-2 border-white-600 rounded-lg p-3 text-center">
            <img 
              src="/src/assets/MAXINE.png" 
              alt="Team Member" 
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="font-bold text-lg text-gray-800 mb-2">April M. Baculio</h3>
            <p className="text-gray-600 mb-2">System Analyst</p>
            <a href="mailto:aprilmaxinebaculio2001@gmail.com" className="text-xs text-blue-500 hover:underline"> aprilmaxinebaculio2001@gmail.com </a>
          </div>
          

          {/* Card 2 */}
          <div className="bg-white shadow-xl border-solid border-2 border-white-600 rounded-lg p-3 text-center">
            <img 
              src="/src/assets/JEPOY.png" 
              alt="Team Member" 
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="font-bold text-lg text-gray-800 mb-2">Jefferson C. Sabejon</h3>
            <p className="text-gray-600 mb-2">Front-End Developer</p>
            <a href="mailto:jepoysabejon24@gmail.com" className="text-xs text-blue-500 hover:underline"> jepoysabejon24@gmail.com </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-xl border-solid border-2 border-white-600 rounded-lg p-3 text-center">
            <img 
              src="/src/assets/MEL.png" 
              alt="Team Member" 
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="font-bold text-lg text-gray-800 mb-2">Mel Alejandrino</h3>
            <p className="text-gray-600 mb-2">Back-End Developer</p>
            <a href="mailto:alejandrino.mel002@gmail.com" className="text-xs text-blue-500 hover:underline"> alejandrino.mel002@gmail.com </a>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-xl border-solid border-2 border-white-600 rounded-lg p-3 text-center">
            <img 
              src="/src/assets/ANGELO.png" 
              alt="Team Member" 
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="font-bold text-lg text-gray-800 mb-2">Angelo J. Alfeche</h3>
            <p className="text-gray-600 mb-2">Writer</p>
            <a href="mailto:sarahlee@gmail.com" className="text-xs text-blue-500 hover:underline">alfecheangelo77@gmail.com </a>
          </div>

          {/* Card 5 */}
          <div className="bg-white shadow-xl border-solid border-2 border-white-600 rounded-lg p-3 text-center">
            <img 
              src="/src/assets/JARED.png" 
              alt="Team Member" 
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="font-bold text-lg text-gray-800 mb-2">Jared Simon T. Rara</h3>
            <p className="text-gray-600 mb-2">Researcher</p>
            <a href="mailto:jaredrara11@gmail.com" className="text-xs text-blue-500 hover:underline"> jaredrara11@gmail.com </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
