import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Footer from '../components/footer';
import Topbar from '../components/topBar';
import axios from 'axios';

const ListingFound = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastSeen: '',
    dateTime: '',
    description: '',
    image: null,
    location: '',
    fullName: '',
    contactNumber: '',
    email: '',
    detailedDescription: '',
  });
  const [isLoading, setIsLoading] = useState(false); // To control animation visibility
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validate required fields
    const requiredFields = ['name', 'dateTime', 'description', 'location', 'fullName', 'contactNumber', 'email', 'detailedDescription'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setFormError('Please fill in all required fields.');
        return;
      }
    }

    // Show loading animation
    setIsLoading(true);

    // Prepare form data
    const data = new FormData();
    data.append('name', formData.name);
    data.append('lastSeen', formData.lastSeen);
    data.append('dateTime', formData.dateTime);
    data.append('description', formData.description);
    data.append('image', formData.image);
    data.append('location', formData.location);
    data.append('fullName', formData.fullName);
    data.append('contactNumber', formData.contactNumber);
    data.append('email', formData.email);
    data.append('detailedDescription', formData.detailedDescription);
    data.append('status', 'lost');

    try {
      const response = await axios.post('http://localhost:3000/api/items', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Item added successfully:', response.data);

      // Navigate to the report page after a short delay
      setTimeout(() => {
        navigate('/reportPage');
      }, 2000);
    } catch (error) {
      console.error('Error adding item:', error.message);
      setIsLoading(false); // Hide loading animation
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">CREATE NEW LISTING</h1>

          {/* Lost and Found Item Buttons */}
          <div className="flex justify-center mb-6">
          <Link
              to="/listLost"
              className="px-4 py-2 font-semibold bg-gray-200 text-black rounded-l-lg focus:outline-none"
          >
              LOST ITEM
          </Link>

          {/* Link to Found Item page */}
          <Link
              to="/listFound"
              className="px-4 py-2 font-semibold bg-blue-500 text-white-500 rounded-r-lg focus:outline-none"
          >
              FOUND ITEM
          </Link>
          </div>

          {/* Error Message */}
          {formError && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {formError}
            </div>
          )}

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                ITEM NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter item name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                DATE & TIME <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                DESCRIPTION <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brief description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                UPLOAD AN IMAGE <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                SELECT A LOCATION <span className="text-red-500">*</span>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a location</option>
                <option value="CITC Building">CITC Building</option>
                <option value="CITC-1st Floor">CITC-1st Floor</option>
                <option value="CITC-2nd Floor">CITC-2nd Floor</option>
              </select>
            </div>

            {/* Contact Details */}
            <h2 className="text-xl font-bold text-gray-900 mt-6">CONTACT DETAILS</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                FULL NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                CONTACT NUMBER <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your contact number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                E-MAIL ADDRESS <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                DETAILED DESCRIPTION <span className="text-red-500">*</span>
              </label>
              <textarea
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter detailed description"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600 transition duration-300"
            >
              {isLoading ? 'Submitting...' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ListingFound;