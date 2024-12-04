import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import axios from "axios";
import supabase from "../config/supabaseClient"; // Import Supabase client
import MapWithRestrictedArea from "./MapWithRestrictedArea";

const ListingFound = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastSeen: "",
    dateTime: "",
    description: "",
    location: "",
    fullName: "",
    contactNumber: "",
    email: "",
    imageUrl: "", // Store the image URL here
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [imageFile, setImageFile] = useState(null); // State for the image file
  const [uploading, setUploading] = useState(false); // State for upload status
  const [coordinates, setCoordinates] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false); // Map visibility toggle

  const handleCoordinates = (coords) => {
    setCoordinates(coords);
    setFormData({
      ...formData,
      location: coords.join(", "), // Update the location field in formData
    });
    setIsMapVisible(false); // Hide the map after confirmation
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Upload image to Supabase
  const uploadImage = async () => {
    if (!imageFile) {
      alert("Please select an image!");
      return null; // Return null if no image is selected
    }

    setUploading(true);
    const fileName = `${Date.now()}_${imageFile.name}`;
    try {
      const { error } = await supabase.storage
        .from("images")
        .upload(fileName, imageFile);

      if (error) {
        throw error;
      }

      const imageUrl = `https://tqvgagdffmjtxswldtgm.supabase.co/storage/v1/object/public/images/${fileName}`; // Get the URL of the uploaded image
      return imageUrl; // Return the image URL for form submission
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setUploading(false);
      return null; // Return null if there's an error
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validate required fields
    const requiredFields = [
      "name",
      "dateTime",
      "description",
      "fullName",
      "contactNumber",
      "email",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setFormError("Please fill in all required fields.");
        return;
      }
    }

    // Upload image first
    setIsLoading(true);
    const imageUrl = await uploadImage();

    if (!imageUrl) {
      setFormError("Failed to upload the image. Please try again.");
      setIsLoading(false);
      return;
    }

    // Add the uploaded image URL to the form data
    const data = {
      ...formData,
      imageUrl,
      status: "found",
      coordinates, // Add coordinates to the data
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/items",
        data
      );
      console.log("Item added successfully:", response.data);

      // Navigate to the report page after a short delay
      setTimeout(() => {
        navigate("/reportPage");
      }, 2000);
    } catch (error) {
      console.error("Error adding item:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            CREATE NEW LISTING
          </h1>

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
                UPLOAD AN IMAGE
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <p className="text-sm text-gray-600 text-justify"> <b> Note: </b> Attach an image if available  </p>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                LOCATION <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location} // Use formData.location instead of coordinates directly
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Show Map Button */}
              <button
                type="button"
                onClick={() => setIsMapVisible(true)}
                className="mt-2 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Show Map
              </button>
              {isMapVisible && (
                <MapWithRestrictedArea onConfirm={handleCoordinates} />
              )}
            </div>

            {/* Contact Details */}
            <h2 className="text-xl font-bold text-gray-900 mt-6">
              CONTACT DETAILS
            </h2>

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
                type="text"
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
                EMAIL <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <p className="text-sm text-gray-600 text-justify"> <b> Note: </b> Ticket will expire within 30 days if not retrieve.  </p>


            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`bg-blue-500 text-white font-bold py-2 px-6 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Listing"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ListingFound;
