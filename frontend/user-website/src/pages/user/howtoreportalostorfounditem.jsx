import React from 'react';
import Footer from '../../components/user/footer';
import Topbar from '../../components/user/topBar';

const ReportLostFoundItem = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="flex justify-center px-6 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
          {/* Title */}
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            How to Report a Lost or Found Item
          </h2>

          {/* Centered Image */}
          <div className="flex justify-center mb-10">
            <img
              src="src/assets/Report a Lost or Found Item.png"
              alt="Report Lost or Found Item"
              className="rounded-lg shadow-lg max-w-full"
            />
          </div>

          {/* Introduction */}
          <p className="text-lg text-gray-700 leading-relaxed text-center mb-12">
            Reporting a lost or found item is a straightforward and crucial step to
            ensure that belongings are returned to their rightful owners. U-FIND has
            developed a seamless process to handle these situations effectively. Here’s
            how to use our system to report lost or found items:
          </p>

          {/* Steps to Report a Lost Item */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Steps to Report a Lost Item
            </h3>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                1. Log in to Your U-FIND Account
              </h4>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> Use your registered credentials to log in to the U-FIND platform. This
                ensures your report is tracked and linked to your account. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                2. Navigate to the "Item Lost" Page
              </h4>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> Click on the "Item Lost" section in the sidebar of the dashboard. This
                page is specifically designed for users to report missing items. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                3. Provide Detailed Information
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Fill out the report form carefully. Include:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Item description (e.g., "Red backpack with a laptop inside").</li>
                <li>Last known location (e.g., "Library, 2nd Floor").</li>
                <li>Approximate time when you noticed it was missing.</li>
                <li>Upload a photo of the lost item, if available.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                4. Review and Submit Your Report
              </h4>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> Double-check the information provided and submit your report. You will
                receive a confirmation notification, and your report will be visible in
                the system for admins and users to match. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                5. Check Notifications Regularly
              </h4>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> Stay updated by checking notifications or messages. U-FIND’s system
                will alert you if a similar item is reported as found.  </li>
              </ul>
            </div>
          </div>

          {/* Steps to Report a Found Item */}
          <div className="space-y-8 mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Steps to Report a Found Item
            </h3>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                1. Log in to Your U-FIND Account
              </h4>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> Ensure you are logged in to the system. This helps us keep track of your contributions and makes communication seamless. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                2. Navigate to the "Item Found" Page
              </h4>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> On the sidebar, click the "Item Found" section. This is where you can
                log items that you have found. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                3. Provide Accurate Details
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Fill in the following details in the form:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>A brief description of the item (e.g., "Black wallet with ID cards and cash").</li>
                <li>The location where you found the item (e.g., "Near the cafeteria exit").</li>
                <li>Time and date when the item was found.</li>
                <li>Upload a clear photo of the item.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                4. Submit the Found Item Report
              </h4>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> After verifying all the details, submit the report. The system will
                process your input and cross-match it with any existing lost item
                reports. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                5. Cooperate with the Admin Team
              </h4>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> Once the rightful owner is identified, U-FIND’s admin team will contact
                both parties to facilitate the return. Be responsive to messages to
                ensure a smooth handover process. </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReportLostFoundItem;
