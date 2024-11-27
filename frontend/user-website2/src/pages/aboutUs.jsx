import React from 'react';
import Footer from '../components/footer';
import Topbar from '../components/topBar';

const AboutUs = () => {
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
        <p className="max-w-7xl mx-auto text-gray-700 text-justify leading-relaxed mb-6">
          U-Find is a user-friendly web and mobile platform designed to help students and staff report, track, and retrieve lost and found items on campus. Our system allows users to securely log in and report any lost or found items, making it easier for the rightful owners to be reunited with their belongings. With real-time notifications, users are quickly alerted whenever a match for their lost or found item is made.
        </p>
        <p className="max-w-7xl mx-auto text-gray-700 text-justify leading-relaxed">
          Administrators can efficiently manage reports, ensuring that all cases are handled smoothly. Our goal is to create a seamless and convenient experience for the campus community, helping lost items find their way back to their owners in a secure and timely manner.
        </p>
      </section>

      {/* Meet the Team Section */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-5xl font-semibold text-center mb-8">Meet the Team</h2>

        <p className="max-w-6xl mx-auto text-gray-700 leading-relaxed text-center">
        Meet the team's dedication, skills, and the collaborative spirit that drives U-Find's success, while also positioning the team as approachable, skilled, and passionate about their mission.
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
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
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
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
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
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
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
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
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
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

      <Footer />
    </div>
  );
};

export default AboutUs;
