import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Topbar from '../components/topBar';

const ItemDescription = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

        <Topbar />

            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">

                
                
                {/* Left Container */}
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 border-r">
                    <button
                        onClick={() => navigate(-1)}
                        className="self-start mb-4 text-gray-600 hover:text-gray-900"
                    >
                        ← Back
                    </button>
                    <div className="w-full h-80 bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                            src="/path/to/image.jpg"
                            alt="Item"
                            className="w-full h-full object-cover blur-md"
                        />
                    </div>
                </div>

                {/* Right Container */}
                <div className="w-full md:w-1/2 p-6 flex flex-col space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">AQUAFLASK</h2>

                    {/* Full Name */}
                    <div>
                        <label className="text-sm text-gray-600">Full Name</label>
                        <input
                            type="text"
                            defaultValue="Jefferson Sabejon"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                    </div>

                    {/* Last Seen Location */}
                    <div>
                        <label className="text-sm text-gray-600">Last Seen Location</label>
                        <input
                            type="text"
                            defaultValue="Cafeteria Table"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm text-gray-600">Description</label>
                        <textarea
                            defaultValue="Color Purple and 40oz"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="text-sm text-gray-600">Date</label>
                        <input
                            type="text"
                            defaultValue="October 29, 2002"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                    </div>

                    {/* Posted By */}
                    <p className="text-gray-600 mt-4">
                        Posted by <span className="font-semibold">Angelo Alfeche</span>
                    </p>

                    {/* Send Message Button */}
                    <button className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 focus:outline-none">
                        Send Message
                    </button>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default ItemDescription;
