import React from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topBar';

const Dashboard = () => {
    return (
        <div className="flex">
            <Sidebar />

            <div className="w-full">
                <Topbar />

                <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-400 p-10">
                    <div className="text-center mb-10">
                        <h1 className="text-8xl font-bold text-white">DASHBOARD</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Item Found Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Items Found</h2>
                            <p className="text-3xl font-bold text-blue-500">120</p>
                        </div>

                        {/* Item Lost Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Items Lost</h2>
                            <p className="text-3xl font-bold text-blue-500">85</p>
                        </div>

                        {/* Match Items Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Match Items</h2>
                            <p className="text-3xl font-bold text-blue-500">45</p>
                        </div>

                        {/* Ticketing Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ticketing</h2>
                            <p className="text-3xl font-bold text-blue-500">30</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
