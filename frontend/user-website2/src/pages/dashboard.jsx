import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Topbar from '../components/topBar';

const Dashboard = () => {

    const [items, setItems] = useState([]);

    // Fetch data on component mount
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/items?limit=5'); // Adjust endpoint as necessary
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Topbar />

            <main className="max-w-8xl mx-auto px-10 py-10">
                {/* Hero Section */}
                <section className="text-center mb-10">
                    <div className="flex justify-center items-center space-x-10">
                        <img src="/src/assets/U-FIND (3).png" alt="U-FIND Logo" className="w-90 h-80 object-cover" />
                        <div className="text-left max-w-md">
                            <h2 className="text-5xl font-bold text-gray-900 mb-4">U-FIND</h2>
                            <p className="text-gray-800 mb-12">
                                U-find is a platform for reporting, tracking, and retrieving lost and found items on campus. Secure authentication and real-time notifications help quickly reunite lost items with their owners, while admins efficiently manage reports.
                            </p>    
                            <Link to="/listLost" className="mt-6">
                                <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                                REPORT NOW!
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                 {/* Browse Items Section */}
                 <section className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10">BROWSE ITEMS</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {items.length > 0 ? (
                            items.slice(0, 5).map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition"
                                >
                                    <Link to={`/item/${item.id}`}>
                                        <img
                                            src={item.imageUrl || '/src/assets/default.png'} // Fallback for missing images
                                            alt={item.name}
                                            className="w-full h-50 object-cover mb-4 rounded-md"
                                        />
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-gray-600">Last Seen: {item.lastSeen}</p>
                                        <p className={`text-${item.status === 'lost' ? 'red' : 'green'}-500 font-semibold capitalize`}>
                                            {item.status}
                                        </p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No items found.</p>
                        )}
                    </div>

                    {/* View More Button */}
                    <div className="mt-6">
                        <Link to="/browseItemsLost">
                        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                            VIEW MORE
                        </button>
                        </Link>
                    </div>
                </section>



               {/* Features Section */}
                <section className="flex flex-wrap justify-center gap-20 p-10">
                    {[
                        {
                            title: "Easy to Use",
                            description: "Refers to a system or tool designed for intuitive and straightforward operation, requiring minimal effort or training for users.",
                            imgSrc: "/src/assets/easytouse.png"
                        },
                        {
                            title: "Reliable",
                            description: "Indicates a product or service that consistently performs well without failure, ensuring dependability and trustworthiness.",
                            imgSrc: "/src/assets/easytouse.png"
                        },
                        {
                            title: "Efficient",
                            description: "Describes a process or tool that maximizes productivity with minimal waste of time or resources, achieving desired outcomes effectively.",
                            imgSrc: "/src/assets/easytouse.png"
                        }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-60 text-center">
                            <div className="flex justify-center mb-4">
                                <img src={feature.imgSrc} alt={`${feature.title} icon`} className="w-16 h-16" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.description}</p>
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
                        <p className="text-gray-600 mt-5">
                            U-find is a platform for reporting, tracking, and retrieving lost and found items on campus. Secure authentication and real-time notifications help quickly reunite lost items with their owners, while admins manage reports efficiently.
                        </p>
                        <a href="/aboutUs" className="mt-6">
                            <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded">
                                READ MORE
                            </button>
                        </a>

                    </div>
                </section>

                {/* Banner Section */}
                <div className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 text-center text-white py-4 font-bold">
                    YOUR PERSONAL INFORMATION WILL NOT BE DISCLOSED WITH ANYONE.
                </div>

                {/* Features Content */}
                <div className="text-left my-10 px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">CHECK OUT THE UNIQUE FEATURES OF U-FIND PLATFORM</h2>
                    <p className="text-gray-700 mb-10">
                        The Lost and Found App makes your life easier; significantly decreasing workload while increasing service capabilities and customer success rates.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">WORKS ON ANY DEVICE</h3>
                            <p className="text-gray-600">Connect with any device: tablets, smartphones, desktops, and more.</p>
                        </div>
                        <div className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">SMART MATCHING</h3>
                            <p className="text-gray-600">Automated smart matching makes manual searching obsolete.</p>
                        </div>
                        <div className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">CUSTOMER SUPPORT</h3>
                            <p className="text-gray-600">24/7 support to assist users with lost and found items.</p>
                        </div>
                    </div>
                </div>

                {/* App Look and Feel Section */}
                <section className="bg-gray-50 py-10">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">APP LOOK AND FEEL</h2>
                        <p className="text-gray-700 mb-10">
                            Next-generation Lost and Found, available today! Easy to use, and an incredible relief for your staff with a focus on customer service.
                        </p>

                        {/* Carousel for Images */}
                        <div className="flex justify-center items-center space-x-4">
                            <button className="bg-gray-300 p-2 rounded-full hover:bg-gray-400">❮</button>
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="bg-gray-200 w-40 h-40 rounded-lg flex items-center justify-center text-gray-600">
                                    <h3>Image {index + 1}</h3>
                                </div>
                            ))}
                            <button className="bg-gray-300 p-2 rounded-full hover:bg-gray-400">❯</button>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
};

export default Dashboard;
