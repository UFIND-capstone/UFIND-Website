import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topBar';

const Dashboard = () => {
    const [itemCounts, setItemCounts] = useState({
        itemsFound: 0,
        itemsLost: 0,
        matchItems: 0,
        ticketing: 0,
    });

    // Fetch items and calculate counts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/items'); // Adjust the URL as needed
                const items = response.data;

                // Calculate counts based on status
                const counts = {
                    itemsFound: items.filter(item => item.status === 'Found').length,
                    itemsLost: items.filter(item => item.status === 'Lost').length,
                    matchItems: items.filter(item => item.category === 'Match').length,
                    ticketing: items.filter(item => item.category === 'Ticketing').length,
                };

                setItemCounts(counts);
            } catch (error) {
                console.error("Error fetching items:", error.message);
            }
        };

        fetchItems();
    }, []);

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
                            <p className="text-3xl font-bold text-blue-500">{itemCounts.itemsFound}</p>
                        </div>

                        {/* Item Lost Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Items Lost</h2>
                            <p className="text-3xl font-bold text-blue-500">{itemCounts.itemsLost}</p>
                        </div>

                        {/* Match Items Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Match Items</h2>
                            <p className="text-3xl font-bold text-blue-500">{itemCounts.matchItems}</p>
                        </div>

                        {/* Ticketing Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ticketing</h2>
                            <p className="text-3xl font-bold text-blue-500">{itemCounts.ticketing}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;