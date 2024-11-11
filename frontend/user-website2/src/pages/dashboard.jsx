import React from 'react';
import Sidebar from '../components/footer';
import Topbar from '../components/topBar';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            
           {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 py-10">
                    <section className="text-center mb-10">
                        <div className="flex justify-center items-center space-x-10">
                            <img src="/src/assets/U-FIND (3).png" alt="Detective Illustration" className="w-90 h-80 object-cover" />
                            <div className="text-left max-w-md">
                                <h2 className="text-5xl font-bold text-gray-900 mb-4">U-FIND</h2>
                                <p className="text-gray-800 mb-12">
                                    U-find is a web and mobile platform for reporting, tracking, and retrieving lost and found items on campus. Secure authentication and real-time notifications help quickly
                                    reunite lost items with their owners, while admins efficiently manage reports.
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
                        {/* Item Cards */}
                        {[
                            { name: 'NECKLACE', location: 'Lost in Cafeteria', imgSrc: '/src/assets/necklace.png' },
                            { name: 'SCHOOL ID', location: 'Lost in Library', imgSrc: '/src/assets/schoolid.png' },
                            { name: 'TUMBLER', location: 'Lost in Gym', imgSrc: '/src/assets/aquaflask.png' },
                            { name: 'CALCULATOR', location: 'Lost in Lab', imgSrc: '/src/assets/calculator.png' },
                            { name: 'WALLET', location: 'Lost in Parking Lot', imgSrc: '/src/assets/wallet.png' }
                        ].map((item, index) => (
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

                <section className="text-center my-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Feature Card */}
                    {['EASY TO USE', 'EASY TO USE', 'EASY TO USE'].map((title, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                            <img src="/src/assets/easytouse.png" alt="Feature Icon" className="w-40 h-40 mb-10" />
                            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                            <p className="text-gray-600">DESCRIPTION</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Us Section */}
            <section className="bg-gray-100 py-10">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:space-x-10 px-4">
                    {/* Illustration */}
                    <div className="flex-shrink-0 mb-6 md:mb-0">
                        <img src="/src/assets/U-FIND (3).png" alt="Detective Illustration" className="w-full md:w-80 h-auto object-cover rounded-lg" />
                    </div>

                    {/* About Content */}
                    <div className="text-left max-w-md">
                        <span className="inline-block bg-blue-400 text-white px-4 py-1 rounded-full font-semibold mb-4">ABOUT US</span>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">U-FIND</h2>
                        <p className="text-gray-1000 mb-10">
                            U-find is a web and mobile platform for reporting, tracking, and retrieving lost and
                            found items on campus. Secure authentication and real-time notifications help quickly
                            reunite lost items with their owners, while admins efficiently manage reports.
                        </p>
                        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                            READ MORE
                        </button>
                    </div>
                </div>
            </section>

             {/* Unique Features Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Banner */}
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-center text-white font-semibold py-2">
                        YOUR PERSONAL INFORMATION WILL NOT BE DISCLOSED WITH ANYONE.
                    </div>

                    {/* Features Content */}
                    <div className="text-left my-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">CHECK OUT THE UNIQUE FEATURES OF U-FIND PLATFORM</h2>
                        <p className="text-gray-700 mb-10">
                            The Lost and Found App makes your life easier; not only by significantly decreasing your workload. With us, you also increase your service capabilities as well as your customer success rate!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Feature Boxes */}
                            <div className="shadow-md p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">WORKS ON ANY DEVICE</h3>
                                <p className="text-gray-600">Tablets, smartphones, desktop computers, and more – connect with any device.</p>
                            </div>
                            <div className="shadow-md p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">SMART MATCHING</h3>
                                <p className="text-gray-600">Automated Smart Matching makes manual searching obsolete. Save time and costs by letting the Lost & Found App.</p>
                            </div>
                            <div className="shadow-md p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">SMART MATCHING</h3>
                                <p className="text-gray-600">Automated Smart Matching makes manual searching obsolete. Save time and costs by letting the Lost & Found App.</p>
                            </div>
                        </div>
                    </div>

                {/* Features Image Placeholder */}
                <div className="bg-gray-200 text-center py-20 rounded-lg mb-10">
                    <h3 className="text-2xl font-semibold text-gray-600">FEATURES IMAGES HERE</h3>
                </div>
            </div>
        </section>

        {/* App Look and Feel Section */}
        <section className="py-10">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">APP LOOK AND FEEL</h2>
                <p className="text-gray-700 mb-10">
                    Next generation Lost and Found available today! Easy to use, an unbelievable relief for your staff with an incredible focus on Customer Service.
                </p>

                {/* Carousel for Images */}
                <div className="flex justify-center items-center space-x-4">
                    <button className="bg-gray-300 p-2 rounded-full hover:bg-gray-400">❮</button>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="bg-gray-200 w-40 h-40 rounded-lg flex items-center justify-center text-gray-600">
                            <h3>IMAGES HERE</h3>
                        </div>
                    ))}
                    <button className="bg-gray-300 p-2 rounded-full hover:bg-gray-400">❯</button>
                </div>
            </div>
        </section>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-center text-white font-semibold py-2 mt-10">
            YOUR PERSONAL INFORMATION WILL NOT BE DISCLOSED WITH ANYONE.
        </div>

                {/* QR Code Section */}
        <section className="py-10">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                {/* Text Section */}
                <div className="text-left">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">TRY IT ON YOUR MOBILE DEVICE</h2>
                    <p className="text-gray-600">SCAN TO VIEW ON YOUR MOBILE DEVICE</p>
                </div>
                
                {/* Arrow and QR Code */}
                <div className="flex items-center space-x-8">
                    <span className="text-8xl">➔</span>
                    <img src="/src/assets/qrcode.png" alt="QR Code" className="w-40 h-40" />
                </div>
            </div>
        </section>

        {/* About and Contact Info Section */}
        <section className="bg-gradient-to-r from-blue-500 to-cyan-500 py-10 text-white">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* About Us */}
                <div>
                    <h3 className="text-2xl font-bold mb-4">ABOUT US</h3>
                    <p className="text-sm mb-6">
                        U-find is a web and mobile platform for reporting, tracking, and retrieving lost and found items on campus. 
                        Secure authentication and real-time notifications help quickly reunite lost items with their owners, while admins efficiently manage reports.
                    </p>
                    {/* Social Media Icons */}
                    <div className="flex space-x-4 text-2xl">
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-snapchat"></i></a>
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-2xl font-bold mb-4">CONTACT INFO</h3>
                    <p className="text-sm">
                        Claro M. Recto Avenue, Lapasan<br />
                        9000 Cagayan de Oro City, Philippines<br />
                        +639295832504
                    </p>
                </div>
            </div>
        </section>
      

            </main>
        </div>
    );
};

export default Dashboard;
