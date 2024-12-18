import React from 'react';
import Footer from '../../components/user/footer';
import Topbar from '../../components/user/topBar';

const ProtectYourBelongings = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md px-6 py-12 mt-12 mb-12">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          How to Protect Your Belongings
        </h2>

        {/* Centered Image */}
        <div className="flex justify-center mb-10">
          <img
            src="src/assets/Protect Your Belongings.png"
            alt="Protect Belongings"
            className="rounded-lg shadow-lg max-w-full"
          />
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-6xl mx-auto mb-12">
          In today’s fast-paced environment, it’s crucial to take proactive measures to protect your belongings, especially in crowded areas like campuses. U-FIND is here to support you, but prevention is always better than recovery. Below are practical steps you can take to safeguard your personal items and reduce the risk of losing them.
        </p>

        {/* Tips Section */}
        <div className="space-y-8">
          {/* Tip 1 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              1. Label Your Belongings
            </h3>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Use a permanent marker, label, or tag to personalize your items.</li>
              <li>Include your name and contact details discreetly.</li>
              <li>Engrave your name on tech gadgets if possible.</li>
              <li>Personalized labels make it easier for others to return lost items.</li>
            </ul>
          </div>

          {/* Tip 2 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              2. Be Organized
            </h3>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Keep your essentials in the same spot every time.</li>
              <li>Use a specific pocket in your bag or locker for important items.</li>
              <li>Check your surroundings before leaving common areas.</li>
            </ul>
          </div>

          {/* Tip 3 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              3. Invest in Secure Accessories
            </h3>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Use backpacks or bags with hidden zippers and anti-theft locks.</li>
              <li>Invest in RFID-blocking wallets to protect sensitive information.</li>
              <li>Lock bicycles or scooters in designated areas with high-quality locks.</li>
            </ul>
          </div>

          {/* Tip 4 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              4. Avoid Leaving Belongings Unattended
            </h3>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Leaving items unattended increases the risk of theft or loss.</li>
              <li>Ask a trusted person to watch your belongings if you need to step away.</li>
            </ul>
          </div>

          {/* Tip 5 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              5. Secure Digital Devices
            </h3>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Set a password or biometric lock on laptops, smartphones, and tablets.</li>
              <li>Enable tracking apps like "Find My Device" to locate lost gadgets quickly.</li>
            </ul>
          </div>

          {/* Tip 6 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              6. Be Aware of High-Risk Areas
            </h3>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Stay alert in crowded areas like cafeterias or sports facilities.</li>
              <li>Keep your belongings close in such high-risk locations.</li>
            </ul>
          </div>

          {/* Tip 7 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              7. Report Suspicious Activities
            </h3>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Inform authorities or campus security if you notice suspicious behavior.</li>
              <li>Taking precautionary steps helps reduce the inconvenience of losing items.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProtectYourBelongings;
