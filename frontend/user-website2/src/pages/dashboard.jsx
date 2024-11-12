import React from 'react';
import axios from 'axios';
import Footer from '../components/footer';
import Topbar from '../components/topBar';

const Dashboard = () => {
    const items = [
        { name: 'NECKLACE', location: 'Lost in Cafeteria', imgSrc: '/src/assets/necklace.png' },
        { name: 'SCHOOL ID', location: 'Lost in Library', imgSrc: '/src/assets/schoolid.png' },
        { name: 'TUMBLER', location: 'Lost in Gym', imgSrc: '/src/assets/aquaflask.png' },
        { name: 'CALCULATOR', location: 'Lost in Lab', imgSrc: '/src/assets/calculator.png' },
        { name: 'WALLET', location: 'Lost in Parking Lot', imgSrc: '/src/assets/wallet.png' }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Topbar />

            <main className="max-w-7xl mx-auto px-4 py-10">
                {/* Hero Section */}
                <section className="text-center mb-10">
                    <div className="flex justify-center items-center space-x-10">
                        <img src="/src/assets/U-FIND (3).png" alt="Detective Illustration" className="w-90 h-80 object-cover" />
                        <div className="text-left max-w-md">
                            <h2 className="text-5xl font-bold text-gray-900 mb-4">U-FIND</h2>
                            <p className="text-gray-800 mb-12">
                            U-find is a web and mobile platform for reporting, tracking, and retrieving lost and found items on Secure campus. authentication and real-time notifications help quickly reunite lost items with their owners, while admins efficiently manage reports.
                            </p>
                            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                                REPORT NOW!
                            </button>
                        </div>
                    </div>
                </section>

                {/* Browse Items Section */}
                <section className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10">BROWSE ITEMS</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {items.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition">
                                <img src={item.imgSrc} alt={item.name} className="w-full h-32 object-cover mb-4 rounded-md" />
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-gray-600">{item.location}</p>
                            </div>
                        ))}
                    </div>
                    <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                        VIEW MORE
                    </button>   
                </section>

                {/* Features Section */}
                <section className="flex flex-wrap justify-center gap-6 p-6">
                    {["Easy to Use", "Easy to Use", "Easy to Use"].map((title, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-60 text-center">
                            <div className="flex justify-center mb-4">
                                <img src="/src/assets/easytouse.png" alt="Feature Icon" className="w-16 h-16" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                            <p className="text-gray-600 mt-2">Description</p>
                        </div>
                    ))}
                </section>

                {/* About Section */}
                <section className="flex flex-col md:flex-row justify-between items-center bg-white p-6 md:p-10 mx-4 md:mx-12 mb-8 rounded-lg shadow-lg">
                    <div className="flex-shrink-0 mb-4 md:mb-0">
                        <img src="/src/assets/U-FIND (3).png" alt="Illustration" className="w-full max-w-xs" />
                    </div>
                    <div className="flex-grow md:pl-8">
                        <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded mb-2">
                            ABOUT US
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800">U-FIND</h2>
                        <p className="text-gray-600 mt-2">
                            U-find is a web and mobile platform for reporting, tracking, and retrieving lost and found items on campus.
                            Secure authentication and real-time notifications help quickly reunite lost items with their owners, while admins
                            efficiently manage reports.
                        </p>
                        <button className="mt-4 bg-blue-500 text-white font-bold px-4 py-2 rounded">
                            READ MORE
                        </button>
                    </div>
                </section>

                {/* Banner Section */}
                <div className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 text-center text-white py-4 font-bold">
                    YOUR PERSONAL INFORMATION WILL NOT BE DISCLOSED WITH ANYONE.
                </div>
            </main>
            <Footer />
        </div>
        
    );
};

export default Dashboard;
