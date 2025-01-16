import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/user/footer";
import Topbar from "../../components/user/topBar";
import axios from "axios";
import supabase from "../../config/supabaseClient"; // Import Supabase client
import MapWithRestrictedArea from "./MapWithRestrictedArea";
import { useAuth } from "../../AuthContext";

const ListingFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userFullname = user.firstName + " " + user.lastName;
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    dateTime: "",
    description: "",
    location: "",
    fullName: userFullname || " ", // Use user details if available
    contactNumber: user?.contactNumber || "",
    email: user?.emailAddress || "",
    imageUrl: "", // Store the image URL here
    claimStatus: "",
  });
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [imageFile, setImageFile] = useState(null); // State for the image file
  const [uploading, setUploading] = useState(false); // State for upload status
  const [coordinates, setCoordinates] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false); // Map visibility toggle

  const handleCoordinates = (coords) => {
    const [latitude, longitude] = coords; // Destructure in correct order: longitude first, then latitude
    const formattedLocation = `${latitude}, ${longitude}`; // Format as "latitude, longitude"

    setCoordinates(coords);
    setFormData({
      ...formData,
      location: formattedLocation, // Update location with formatted value
    });
    setIsMapVisible(false); // Hide the map after confirmation
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format as "yyyy-mm-dd hh:mm"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Only JPG and PNG files are allowed.");
        return;
      }
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

    const formattedDateTime = formatDate(formData.dateTime);

    // Update formData with the formatted date
    const updatedFormData = {
      ...formData,
      dateTime: formattedDateTime, // Use the formatted date
    };

    const data = {
      ...updatedFormData,
      studentId: user.id,
      imageUrl,
      status: "found",
      ticket: "pending",
    };
    console.log(data);

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
                placeholder="Enter general description"
                required
              />
            </div>

            <p className="text-xs text-gray-600 text-justify">
              {" "}
              <b> Note: </b> "Please use a general description of the item to
              help with later verification (e.g. item type & near location).
            </p>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                UPLOAD AN IMAGE
              </label>
              <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept=".jpg,.png"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            <p className="text-sm text-gray-600 text-justify">
              {" "}
              <b> Note: </b> Attach an image if available.{" "}
            </p>

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
                className="mt-2 w-full mb-5 text-white bg-blue-500 hover:bg-blue-700 px-20 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Show Map
              </button>
              {isMapVisible && (
                <MapWithRestrictedArea onConfirm={handleCoordinates} />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Claim Status <span className="text-red-500">*</span>
              </label>
              <select
                name="claimStatus"
                value={formData.claimStatus || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, claimStatus: value });
                  if (value === "keep") {
                    setAlertMessage(
                      "You’ve chosen to keep the item. Be sure to check all claim details carefully and confirm ownership before returning it."
                    );
                  } else if (value === "turnover(guard)") {
                    setAlertMessage(
                      "You’ve handed over the verification to the OSA. Future claims will be managed by them."
                    );
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select claim status
                </option>
                <option value="keep">Keep</option>
                <option value="turnover(guard)">Turnover</option>
              </select>
            </div>

            <p className="text-sm text-gray-600 text-justify">
              {" "}
              <b> Note: </b> Are you going to keep the item and give it yourself, or turn it over to Campus Security - Gate Entrance{" "}
            </p>


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
                placeholder="Enter your e-mail address"
                required
              />
            </div>

            <p className="text-sm text-gray-600 text-justify">
              {" "}
              <b> Note: </b> Ticket will expire within 30 days if not retrieve.{" "}
            </p>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`bg-blue-500 text-white font-bold py-2 px-20 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "SUBMITTING..." : "SUBMIT"}
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
