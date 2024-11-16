import React from 'react';
import Footer from '../components/footer';
import Topbar from '../components/topBar';

const ReportLostFoundItem = () => {
  return (
    <div className="container mx-auto px-6 py-12">
        <Topbar />
      <h2 className="text-3xl font-semibold text-center mb-8">How to Report a Lost or Found Item</h2>
      
      {/* Image centered */}
      <div className="flex justify-center mb-8">
        <img 
          src="https://via.placeholder.com/400x300" 
          alt="Report Lost or Found Item" 
          className="rounded-lg shadow-lg" 
        />
      </div>

      {/* Text Content */}
      <div className="text-justify space-y-6">
        <p>
          Reporting a lost or found item is a straightforward and crucial step to ensure that belongings are returned to their rightful owners. U-FIND has developed a seamless process to handle these situations effectively. Here’s how to use our system to report lost or found items:
        </p>

        <h3 className="text-xl font-semibold">Steps to Report a Lost Item</h3>
        
        <h4 className="text-lg font-medium">1. Log in to Your U-FIND Account</h4>
        <p>
          Use your registered credentials to log in to the U-FIND platform. This ensures your report is tracked and linked to your account.
        </p>

        <h4 className="text-lg font-medium">2. Navigate to the "Item Lost" Page</h4>
        <p>
          Click on the "Item Lost" section in the sidebar of the dashboard. This page is specifically designed for users to report missing items.
        </p>

        <h4 className="text-lg font-medium">3. Provide Detailed Information</h4>
        <p>
          Fill out the report form carefully. Include:
          <ul className="list-disc pl-6 mt-2">
            <li>Item description (e.g., "Red backpack with a laptop inside").</li>
            <li>Last known location (e.g., "Library, 2nd Floor").</li>
            <li>Approximate time when you noticed it was missing.</li>
            <li>Upload a photo of the lost item, if available. Clear visuals improve the chances of matching your report with a found item.</li>
          </ul>
        </p>

        <h4 className="text-lg font-medium">4. Review and Submit Your Report</h4>
        <p>
          Double-check the information provided and submit your report. You will receive a confirmation notification, and your report will be visible in the system for admins and users to match.
        </p>

        <h4 className="text-lg font-medium">5. Check Notifications Regularly</h4>
        <p>
          Stay updated by checking notifications or messages. U-FIND’s system will alert you if a similar item is reported as found.
        </p>

        <h3 className="text-xl font-semibold">Steps to Report a Found Item</h3>
        
        <h4 className="text-lg font-medium">1. Log in to Your U-FIND Account</h4>
        <p>
          Ensure you are logged in to the system. This helps us keep track of your contributions and makes communication seamless.
        </p>

        <h4 className="text-lg font-medium">2. Navigate to the "Item Found" Page</h4>
        <p>
          On the sidebar, click the "Item Found" section. This is where you can log items that you have found.
        </p>

        <h4 className="text-lg font-medium">3. Provide Accurate Details</h4>
        <p>
          Fill in the following details in the form:
          <ul className="list-disc pl-6 mt-2">
            <li>A brief description of the item (e.g., "Black wallet with ID cards and cash").</li>
            <li>The location where you found the item (e.g., "Near the cafeteria exit").</li>
            <li>Time and date when the item was found.</li>
            <li>Upload a clear photo of the item.</li>
          </ul>
        </p>

        <h4 className="text-lg font-medium">4. Submit the Found Item Report</h4>
        <p>
          After verifying all the details, submit the report. The system will process your input and cross-match it with any existing lost item reports.
        </p>

        <h4 className="text-lg font-medium">5. Cooperate with the Admin Team</h4>
        <p>
          Once the rightful owner is identified, U-FIND’s admin team will contact both parties to facilitate the return. Be responsive to messages to ensure a smooth handover process.
        </p>

        <h3 className="text-xl font-semibold">Why Use U-FIND for Reporting?</h3>
        
        <h4 className="text-lg font-medium">1. Secure and Confidential</h4>
        <p>
          U-FIND ensures that your personal information remains secure. We only share essential details with involved parties.
        </p>

        <h4 className="text-lg font-medium">2. Real-Time Notifications</h4>
        <p>
          Stay informed about updates to your reports through instant notifications. The system automatically matches reports, reducing the waiting time.
        </p>

        <h4 className="text-lg font-medium">3. Ease of Use</h4>
        <p>
          Our user-friendly interface ensures that even first-time users can navigate and report items without difficulty.
        </p>

        <h4 className="text-lg font-medium">4. Community Collaboration</h4>
        <p>
          By using U-FIND, you contribute to a system that fosters a culture of trust and responsibility within the community.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ReportLostFoundItem;
