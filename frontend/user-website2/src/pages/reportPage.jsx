import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Topbar from "../components/topBar";

const ReportPage = () => {
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-cyan-500">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md text-center">
          {/* Success Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Success Message */}
          <div className="border-green-400 text-green-800 rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">
              🎉 Item Reported Successfully!
            </h1>
            <p className="text-gray-700 mb-4">
              Thank you for reporting the item! Your listing has been successfully added to the system.
            </p>
            <p className="text-gray-700">
              You can now manage it or track its status in your{" "}
              <button
                onClick={() => navigate("/viewmyTickets")}
                className="font-semibold text-green-700 underline hover:text-green-900 focus:outline-none"
              >
                View My Tickets
              </button>.
            </p>
          </div>



          {/* Redirect Button */}
          <button
            onClick={handleDashboardRedirect}
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReportPage;
