import React from 'react';
import Footer from '../../components/user/footer';
import Topbar from '../../components/user/topBar';
import ReportImage from "../../assets/Report a Lost or Found Item.png"
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
            HOW TO REPORT LOST OR FOUND ITEM
          </h2>

          {/* Centered Image */}
          <div className="flex justify-center mb-10">
            <img
              src={ReportImage}
              alt="Report Lost or Found Item"
              className="rounded-lg shadow-lg max-w-full"
            />
          </div>

          {/* Introduction */}
          <p className="text-lg text-gray-700 text-justify leading-relaxed text-center mb-12">
          Losing or finding an item can be a stressful experience, but with U-FIND, we've made the process of reporting and retrieving items simple, efficient, and hassle-free. Our system is designed to provide a seamless experience for users, ensuring lost items find their way back to their rightful owners and found items are promptly reported. Here’s how you can use U-FIND to handle such situations effectively.
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
              <ul className="list-disc pl-6 mt-2 text-justify	text-gray-700">
                <li> Start by logging into your U-FIND account using your registered email and password. This ensures your report is securely stored and linked to your profile, allowing us to notify you promptly if a match is found. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                2. Navigate to the "Homepage" Page
              </h4>
              <ul className="list-disc pl-6 mt-2 text-justify text-gray-700">
                <li> Once logged in, locate the "Report Item" section on the homepage. This dedicated page allows users to describe their missing items in detail.
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                3. Provide Detailed Information
              </h4>
              <p className="text-gray-700 leading-relaxed">
              Fill out the report form with as much information as possible to help others identify your item:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> <b> Description: </b> Specify what the item looks like <i> (e.g., "Blue backpack with a company logo and a laptop inside")</i>. </li>
                <li> <b> Last Known Location: </b> Mention where you last saw the item <i> (e.g., "Library, near the reading section")</i>. </li>
                <li> <b> Date and Time: </b> Note when you realized the item was missing. </li>
                <li> <b> Photo: </b> Upload a clear image, if available, to make identification easier for others. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                4. Review and Submit Your Report
              </h4>
              <ul className="list-disc pl-6 mt-2 text-justify text-gray-700">
                <li> Double-check the details to ensure accuracy. When you're ready, click "Submit" to finalize the report. The item will then appear in the Active Tickets section of your my tickets in dashboard in your top navigation, allowing admins and other users to view and match it with found items. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                5. Monitor Notifications for Updates
              </h4>
              <ul className="list-disc pl-6 mt-2 text-justify text-gray-700">
                <li> Regularly check your U-FIND notifications and browse items. Maybe you will found your item by scrolling in the browse items. </li>
              </ul>
            </div>
          </div>

          {/* Steps to Report a Found Item */}
          <div className="space-y-8 mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Steps to Report a Found Item
            </h3>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                1. Log in to Your U-FIND Account
              </h4>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> Sign in to your U-FIND account to ensure your report is securely recorded and linked to your profile for future follow-up. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                2. Navigate to the "Item Found" Page
              </h4>
              <ul className="list-disc pl-6 mt-2 text-justify text-gray-700">
                <li> From the homepage, click on the "Report Item" section. This page is specifically designed to help users report found items quickly and efficiently. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                3. Provide Accurate Details
              </h4>
              <p className="text-gray-700 leading-relaxed">
              Fill out the form with all the essential details about the item you found:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li> <b> Description: </b> Provide a brief yet clear description <i> (e.g., "Black leather wallet with driver's license and bank cards")</i>.</li>
                <li> <b> Location: </b> Indicate where you discovered the item <i> (e.g., "Cafeteria table near the window")</i>.</li>
                <li> <b> Date and Time: </b> Specify when you found the item. </li>
                <li> <b> Photo: </b> Upload a high-quality image of the item to help the rightful owner identify it easily.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                4. Submit the Found Item Report
              </h4>
              <ul className="list-disc pl-6 text-justify mt-2 text-gray-700">
              <li> Verify all the details you provided before clicking "Submit". Once submitted, the item will appear in the Active Tickets section, enabling admins and potential owners to view the report and reach out. </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                5. Cooperate with the Admin Team
              </h4>
              <ul className="list-disc pl-6 mt-2 text-justify text-gray-700">
                <li> If a match is found, the U-FIND admin team will contact both you and the item’s rightful owner to coordinate the handover. Your cooperation in responding promptly to messages will ensure a smooth and successful return of the item. </li>
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
