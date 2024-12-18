import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/user/footer";
import Topbar from "../../components/user/topBar";

const ContactForm = () => {
  const { itemId } = useParams(); // Retrieve item ID from URL parameters
  const navigate = useNavigate(); // Navigation hook

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData); // Simulate message sending
    alert("Your message has been sent to the item's owner!");
    navigate(-1); // Redirect back to the item details page
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <Topbar />

      {/* Form Container */}
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="bg-white shadow-lg rounded-lg mt-10 p-6 max-w-md w-full">
          {/* Form Header */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Contact the Owner
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Fill out the form below to send a message to the item's owner.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
                rows={5}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Buttons */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md transition-all"
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg shadow-md transition-all"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactForm;
