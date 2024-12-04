import React from 'react';
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function HorizontalContainers() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Topbar */}
    <Topbar />

    <p className="text-gray-600 text-5xl px-30 py-10 font-bold text-center"> NOTIFICATIONS </p>

    
    <div className="flex space-x-4 p-6">
      {/* Container 1 */}
      <div className="w-1/3 p-6 border border-gray-300 rounded-lg bg-gray-100 text-center">
        <p className="text-lg font-semibold text-gray-700">Container 1</p>
      </div>

      {/* Container 2 */}
      <div className="w-1/3 p-6 border border-gray-300 rounded-lg bg-gray-100 text-center">
        <p className="text-lg font-semibold text-gray-700">Container 2</p>
      </div>

      {/* Container 3 */}
      <div className="w-1/3 p-6 border border-gray-300 rounded-lg bg-gray-100 text-center">
        <p className="text-lg font-semibold text-gray-700">Container 3</p>
      </div>
    </div>
    <Footer />
</div>
 
  );
}

export default HorizontalContainers;
