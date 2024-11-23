import React from 'react';
import Footer from '../components/footer';
import Topbar from '../components/topBar';

const ProtectYourBelongings = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          How to Protect Your Belongings
        </h2>

        {/* Centered Image */}
        <div className="flex justify-center mb-10">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Protect Belongings"
            className="rounded-lg shadow-lg max-w-full"
          />
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-12">
          In today’s fast-paced environment, it’s crucial to take proactive measures to protect your belongings, especially in crowded areas like campuses. U-FIND is here to support you, but prevention is always better than recovery. Below are practical steps you can take to safeguard your personal items and reduce the risk of losing them.
        </p>

        {/* Tips Section */}
        <div className="space-y-8">
          {/* Tip 1 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              1. Label Your Belongings
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Use a permanent marker, label, or tag to personalize your items.
              Include your name and contact details discreetly. For tech gadgets,
              consider engraving your name. For items like notebooks, water bottles,
              and bags, personalized labels make it easier for others to identify and
              return them to you.
            </p>
          </div>

          {/* Tip 2 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              2. Be Organized
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Develop a habit of keeping your essentials in the same spot every time,
              such as a specific pocket in your bag or locker. This helps you notice
              immediately if something is missing. Check your surroundings before
              leaving classrooms, libraries, or common areas.
            </p>
          </div>

          {/* Tip 3 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              3. Invest in Secure Accessories
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Use backpacks or bags with hidden zippers, anti-theft locks, or
              RFID-blocking features to prevent theft. For bicycles or scooters,
              always lock them with high-quality locks in designated areas.
            </p>
          </div>

          {/* Tip 4 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              4. Avoid Leaving Belongings Unattended
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Leaving items in public or semi-public areas, even for a few minutes,
              increases the risk of theft or loss. Always ask a trusted person to
              keep an eye on your things if you need to step away.
            </p>
          </div>

          {/* Tip 5 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              5. Secure Digital Devices
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Set a password or biometric lock on laptops, smartphones, and tablets.
              If these items are misplaced, the data inside them remains protected.
              Enable tracking apps like "Find My Device" to locate lost gadgets
              quickly.
            </p>
          </div>

          {/* Tip 6 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              6. Be Aware of High-Risk Areas
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Crowded areas such as cafeterias, sports facilities, or event venues
              are common places where items go missing. Stay alert and keep your
              belongings close in such locations.
            </p>
          </div>

          {/* Tip 7 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              7. Report Suspicious Activities
            </h3>
            <p className="text-gray-700 leading-relaxed">
              If you notice someone tampering with unattended belongings, inform the
              authorities or campus security immediately. At U-FIND, we aim to make
              your experience stress-free, but taking these precautionary steps is
              vital to avoid the inconvenience of losing valuable items.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProtectYourBelongings;
