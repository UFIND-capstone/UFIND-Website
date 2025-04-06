import React from 'react';
import Footer from '../../components/user/footer';
import Topbar from '../../components/user/topBar';
import BelongingsImage from "/assets/Protect Your Belongings.png"
const ProtectYourBelongings = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md px-6 py-12 mt-12 mb-12">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          HOW TO PROTECT YOUR BELONGINGS
        </h2>

        {/* Centered Image */}
        <div className="flex justify-center mb-10">
          <img
            src={BelongingsImage}
            alt="Protect Belongings"
            className="rounded-lg shadow-lg max-w-full"
          />
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed text-justify text-center max-w-6xl mx-auto mb-12">
        In today’s fast-paced world, especially in bustling environments like campuses or public spaces, it’s essential to take proactive measures to safeguard your personal belongings. While U-FIND is here to assist you in reporting and recovering lost or found items, prevention remains the best strategy to avoid the stress and inconvenience of losing your possessions. Follow these practical and effective steps to minimize the risk of losing your items and maintain peace of mind.
        </p>

        {/* Tips Section */}
        <div className="space-y-8">
          {/* Tip 1 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              1. Label Your Belongings
            </h3>

            <p className="text-gray-700 leading-relaxed">
            Adding a personal touch to your belongings not only helps identify them but also increases the likelihood of their return in case they are misplaced.
            </p>

            <ul className="list-disc pl-6 text-gray-700 text-justify leading-relaxed">
              <li>Use permanent markers, personalized labels, or tags to mark your items with your name and contact information. </li>
              <li>Keep the labels discreet to protect your privacy while ensuring identification is easy. </li>
              <li>For tech gadgets, consider engraving your name or initials on the device to make it uniquely yours. </li>
              <li>Personalized labels on items like notebooks, water bottles, and chargers can help distinguish them from others, making it easier for someone to return them to you. </li>
            </ul>
          </div>

          {/* Tip 2 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              2. Be Organized
            </h3>

            <p className="text-gray-700 leading-relaxed">
            An organized approach to managing your belongings can significantly reduce the chances of losing them.
            </p>

            <ul className="list-disc pl-6 text-justify text-gray-700 leading-relaxed">
              <li>Always store your essentials in the same specific spot, such as a designated pocket in your bag, locker, or workspace. </li>
              <li>Before leaving any area, make it a habit to double-check your surroundings to ensure nothing is left behind. </li>
              <li>Use organizers or pouches within your bag to separate and categorize your belongings, making it easier to locate them quickly. </li>
            </ul>
          </div>

          {/* Tip 3 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              3. Invest in Secure Accessories
            </h3>

            <p className="text-gray-700 leading-relaxed">
            Using secure storage solutions for your items adds an extra layer of protection.
            </p>

            <ul className="list-disc pl-6 text-justify text-gray-700 leading-relaxed">
              <li>Opt for anti-theft backpacks or bags with hidden zippers and locks to deter unauthorized access. </li>
              <li>Use RFID-blocking wallets to safeguard sensitive information like credit cards and IDs from digital theft. </li>
              <li>For bicycles, scooters, or other valuable items, always lock them in designated areas using high-quality, tamper-resistant locks. </li>
            </ul>
          </div>

          {/* Tip 4 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              4. Avoid Leaving Belongings Unattended
            </h3>

            <p className="text-gray-700 leading-relaxed">
            Leaving items unattended in public or shared spaces increases the risk of theft or loss.
            </p>

            <ul className="list-disc pl-6 text-justify text-gray-700 leading-relaxed">
              <li>If you need to step away, ask a trusted friend, classmate, or colleague to keep an eye on your belongings. </li>
              <li>Avoid placing valuables in exposed or easily accessible locations, such as on cafeteria tables or benches. </li>
            </ul>
          </div>

          {/* Tip 5 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              5. Secure Digital Devices
            </h3>

            <p className="text-gray-700 leading-relaxed">
            Your gadgets often contain sensitive personal information, making them critical to protect.
            </p>

            <ul className="list-disc pl-6 text-justify text-gray-700 leading-relaxed">
              <li>Always set a strong password or use biometric locks (like fingerprint or facial recognition) on laptops, tablets, and smartphones.</li>
              <li>Enable device tracking applications, such as "Find My Device" or "Find My iPhone," to quickly locate lost gadgets and remotely lock them if necessary.</li>
              <li>Regularly back up your important data to cloud storage to ensure you don’t lose valuable information in case the device cannot be recovered. </li>
            </ul>
          </div>

          {/* Tip 6 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              6. Be Aware of High-Risk Areas
            </h3>

            <p className="text-gray-700 leading-relaxed">
            Crowded and busy locations are hotspots for misplaced or stolen items.
            </p>

            <ul className="list-disc pl-6 text-justify text-gray-700 leading-relaxed">
              <li>Stay vigilant in areas like cafeterias, libraries, sports facilities, or events where belongings can easily get lost in the crowd.</li>
              <li>Keep your bag or personal items within arm’s reach at all times, especially in high-traffic zones. </li>
            </ul>
          </div>

          {/* Tip 7 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              7. Report Suspicious Activities
            </h3>

            <p className="text-gray-700 leading-relaxed">
            Being proactive about security benefits everyone in the community.
            </p>

            <ul className="list-disc pl-6 text-justify mb-20 text-gray-700 leading-relaxed">
              <li> If you notice suspicious behavior or someone handling unattended belongings inappropriately, report it immediately to campus security or local authorities. </li>
              <li> Prompt action can prevent theft and contribute to a safer environment for everyone. </li>
            </ul>
          </div>

          <div>
            <h1 className="text-4xl font-semibold text-gray-800 mb-2">
            Why Choose U-FIND?
            </h1>

            <ul className="list-disc pl-6 text-justify mb-6 text-gray-700 leading-relaxed">
            <li> U-FIND is committed to supporting you in safeguarding and recovering your belongings. However, by implementing these simple yet effective preventive measures, you can minimize the chances of losing your possessions altogether. With our platform as your backup, you have a safety net for handling unforeseen situations while staying proactive in protecting what’s yours. </li>
            </ul>

            <ul className="list-disc pl-6 text-justify text-gray-700 leading-relaxed">
            <li> By following these tips, you not only protect your belongings but also enjoy greater peace of mind, knowing that you’ve taken the necessary precautions. Remember, prevention is always better than recovery, and U-FIND is here to assist you every step of the way. </li>
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
