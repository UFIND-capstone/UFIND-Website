import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Footer from '../components/footer';
import Topbar from '../components/topBar';
import axios from 'axios';

const ListingLost = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: '',
        lastSeen: '',
        dateTime: '',
        description: '',
        category: '',
        fullName: '',
        contactNumber: '',
        email: '',
        detailedDescription: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/items', {
                name: formData.name,
                lastSeen: formData.lastSeen,
                dateTime: formData.dateTime,
                description: formData.description,
                category: formData.category,
                fullName: formData.fullName,
                contactNumber: formData.contactNumber,
                email: formData.email,
                detailedDescription: formData.detailedDescription,
                status: 'lost',
            });
    
            console.log("Item added successfully:", response.data);
            navigate('/dashboard'); // Redirect to the next page
        } catch (error) {
            console.error("Error adding item:", error.message);
            // Optionally, handle the error (e.g., setError('Failed to add item'))
        }
    };
    

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Topbar */}
            <Topbar />

            {/* Main Content */}
            <main className="flex-grow flex justify-center items-center p-6">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">CREATE NEW LISTING</h1>

                    {/* Lost and Found Item Buttons */}
                    <div className="flex justify-center mb-6">
                        <Link
                            to="/listLost"
                            className="px-4 py-2 font-semibold bg-blue-500 text-white rounded-l-lg focus:outline-none"
                        >
                            LOST ITEM
                        </Link>
                        <Link
                            to="/listFound"
                            className="px-4 py-2 font-semibold bg-gray-200 text-black-700 rounded-r-lg focus:outline-none"
                        >
                            FOUND ITEM
                        </Link>
                    </div>

                    {/* Form Fields */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Item Details */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">ITEM NAME</label>
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
                            <label className="block text-sm font-semibold text-gray-700">LAST SEEN LOCATION</label>
                            <input 
                                type="text" 
                                name="lastSeen"
                                value={formData.lastSeen}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Enter last seen location" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">DATE & TIME</label>
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
                            <label className="block text-sm font-semibold text-gray-700">DESCRIPTION</label>
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
                            <label className="block text-sm font-semibold text-gray-700">CATEGORY</label>
                            <input 
                                type="text" 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Enter category" 
                                required 
                            />
                        </div>

                        {/* Contact Details Section */}
                        <h2 className="text-xl font-bold text-gray-900 mt-6">CONTACT DETAILS</h2>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">FULL NAME</label>
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
                            <label className="block text-sm font-semibold text-gray-700">CONTACT NUMBER</label>
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
                            <label className="block text-sm font-semibold text-gray-700">E-MAIL ADDRESS</label>
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
                            <label className="block text-sm font-semibold text-gray-700">DETAILED DESCRIPTION</label>
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
                            SUBMIT
                        </button>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ListingLost;