import React from 'react';
import Footer from '../components/footer';
import Topbar from '../components/topBar';

const ProtectYourBelongings = () => {
  return (
    <div className="container mx-auto px-6 py-12">
        
    <Topbar />

      <h2 className="text-3xl font-semibold text-center mb-8">How to Protect Your Belongings</h2>
      
      {/* Image centered */}
      <div className="flex justify-center mb-8">
        <img 
          src="https://via.placeholder.com/400x300" 
          alt="Protect Belongings" 
          className="rounded-lg shadow-lg" 
        />
      </div>

      {/* Text Content */}
      <div className="text-justify space-y-6">
        <p>
          In today’s fast-paced environment, it’s crucial to take proactive measures to protect your belongings, especially in crowded areas like campuses. U-FIND is here to support you, but prevention is always better than recovery. Below are practical steps you can take to safeguard your personal items and reduce the risk of losing them.
        </p>
        
        <h3 className="text-xl font-semibold">1. Label Your Belongings</h3>
        <p>
          Use a permanent marker, label, or tag to personalize your items. Include your name and contact details discreetly. For tech gadgets, consider engraving your name. For items like notebooks, water bottles, and bags, personalized labels make it easier for others to identify and return them to you.
        </p>

        <h3 className="text-xl font-semibold">2. Be Organized</h3>
        <p>
          Develop a habit of keeping your essentials in the same spot every time, such as a specific pocket in your bag or locker. This helps you notice immediately if something is missing. Check your surroundings before leaving classrooms, libraries, or common areas.
        </p>

        <h3 className="text-xl font-semibold">3. Invest in Secure Accessories</h3>
        <p>
          Use backpacks or bags with hidden zippers, anti-theft locks, or RFID-blocking features to prevent theft. For bicycles or scooters, always lock them with high-quality locks in designated areas.
        </p>

        <h3 className="text-xl font-semibold">4. Avoid Leaving Belongings Unattended</h3>
        <p>
          Leaving items in public or semi-public areas, even for a few minutes, increases the risk of theft or loss. Always ask a trusted person to keep an eye on your things if you need to step away.
        </p>

        <h3 className="text-xl font-semibold">5. Secure Digital Devices</h3>
        <p>
          Set a password or biometric lock on laptops, smartphones, and tablets. If these items are misplaced, the data inside them remains protected. Enable tracking apps like "Find My Device" to locate lost gadgets quickly.
        </p>

        <h3 className="text-xl font-semibold">6. Be Aware of High-Risk Areas</h3>
        <p>
          Crowded areas such as cafeterias, sports facilities, or event venues are common places where items go missing. Stay alert and keep your belongings close in such locations.
        </p>

        <h3 className="text-xl font-semibold">7. Report Suspicious Activities</h3>
        <p>
          If you notice someone tampering with unattended belongings, inform the authorities or campus security immediately. At U-FIND, we aim to make your experience stress-free, but taking these precautionary steps is vital to avoid the inconvenience of losing valuable items. By being mindful and following these tips, you can significantly reduce the risk of misplacing or losing your belongings.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ProtectYourBelongings;
