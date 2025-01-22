import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Reset error and success messages
    setError("");
    setSuccess("");
  
    // Validate contact number
    const contactNumberRegex = /^09\d{9}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      setError("Contact number must start with '09' and be exactly 11 digits.");
      return;
    }
  
    // Validate password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      // Call the register function
      await register({
        firstName,
        lastName,
        emailAddress,
        contactNumber,
        password,
        studentId,
      });
  
      // Success message and redirect
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      // Handle duplicate student ID error
      if (error.response?.data?.message?.includes("Student ID already exists")) {
        setError("The Student ID has already been used. Please use a different one.");
      } else {
        // General error handling
        setError(error.response?.data?.message || "Registration failed. Please try again.");
      }
    }
  };
  

  return (
    <div className="h-auto flex flex-row items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400 p-2 md:p-4">
      {/* Left side with image */}
      <div className="hidden md:flex flex-1 justify-center">
        <img
          src="/src/assets/LOGO.png" // Replace this with the correct path to your image
          alt="Registration Illustration"
          className="max-w-md"
        />
      </div>

      {/* Registration form */}
      <div className="bg-white mx-20 px-6 py-8 rounded-lg shadow-lg max-w-md w-full md:h-auto">
        <h2 className="mb-5 text-3xl text-gray-800 font-bold text-center">
          USER REGISTRATION
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Student ID */}
          <div className="text-left">
            <label
              htmlFor="studentId"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              placeholder="Enter your student ID"
              maxLength={10}
              required
              className="w-full pl-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* First Name */}
          <div className="text-left">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Enter your first name"
              required
              className="w-full pl-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div className="text-left">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Enter your last name"
              required
              className="w-full pl-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Address */}
          <div className="text-left">
            <label
              htmlFor="emailAddress"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="emailAddress"
              value={emailAddress}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              required
              className={`w-full pl-4 py-2 border ${
                /@(gmail\.com|yahoo\.com)$/.test(emailAddress)
                  ? "border-gray-300"
                  : "border-red-500"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {!/@(gmail\.com|yahoo\.com)$/.test(emailAddress) && emailAddress && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div className="text-left">
            <label
              htmlFor="contactNumber"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
              placeholder="Enter your contact number"
              required
              className="w-full pl-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="text-left">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="text-left">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            REGISTER
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
