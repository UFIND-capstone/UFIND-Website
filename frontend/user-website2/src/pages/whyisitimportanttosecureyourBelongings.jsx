import React from 'react';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';

const SecureBelongings = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md mt-12 mb-12">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Why Is It Important to Secure Your Belongings?
        </h1>

        {/* Introduction Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Understanding the Importance of Securing Your Belongings
          </h2>
          <p className="text-lg text-gray-600 text-justify">
            We all have items that are important to us—whether it's our phone, wallet, car keys, or personal documents. These belongings often hold not just financial value but also personal significance. Securing your belongings ensures that you protect both your material possessions and your personal safety.
          </p>
        </section>

        {/* Image Section */}
        <section className="mb-8">
          <img
            src="src/assets/Secure your Belongings (1).png"
            alt="Secure Your Belongings"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </section>

        {/* Why Security Matters */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Is Security So Important?</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700 text-justify">
          <li> In today’s world, theft and loss can happen at any time. Whether you're at home, work, or out in public, the risk of losing something important is always present. Without proper security measures, your valuable possessions can be easily stolen or lost, leading to emotional stress, financial loss, and inconvenience. </li>
          </ul>
        </section>

        {/* Protection from Theft */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Protection from Theft</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700 text-justify">
            <li> When you take steps to secure your belongings, you reduce the risk of theft. This can involve simple actions like locking doors, using safes, or being mindful of where you place your valuables. Theft not only results in financial loss but can also affect your privacy, especially when personal documents or sensitive information is stolen. </li>
          </ul>
        </section>

        {/* Prevention of Loss */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Preventing Loss</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700 text-justify">
            <li> Losing your belongings can happen more easily than you think, whether it’s forgetting your phone in a public space or misplacing your wallet. Securing your belongings helps prevent such occurrences, giving you peace of mind knowing that everything is in its proper place. </li>
          </ul>
        </section>

        {/* Benefits of Securing Your Belongings */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">The Benefits of Securing Your Belongings</h2>
          <ul className="list-disc pl-6 text-lg text-gray-600">
            <li>Reduces the risk of theft and loss.</li>
            <li>Protects your personal and financial information.</li>
            <li>Provides peace of mind in everyday life.</li>
            <li>Prevents inconvenience and unnecessary stress.</li>
            <li>Increases your overall sense of security and safety.</li>
          </ul>
        </section>

        {/* Conclusion */}
        <section>
          <p className="text-lg text-gray-600 text-justify">
            In conclusion, securing your belongings is an essential step toward protecting your valuables and ensuring that your personal information remains safe. By being proactive and adopting simple security practices, you can avoid unnecessary risks and enjoy peace of mind knowing that your important possessions are well-protected.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SecureBelongings;
