import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Topbar from '../components/topBar';

const items = [
    { id: 1, name: 'BOBO SI RARA', date: 'October 5, 2024 at 10:43 PM', location: 'Lost in Cafeteria', image: '/src/assets/necklace.png' },
    { id: 2, name: 'AQUAFLASK', date: 'October 5, 2024 at 10:43 PM', location: 'Lost in Cafeteria', image: '/src/assets/necklace.png' },
    { id: 3, name: 'AQUAFLASK', date: 'October 5, 2024 at 10:43 PM', location: 'Lost in Cafeteria', image: '/src/assets/necklace.png' },
    { id: 4, name: 'AQUAFLASK', date: 'October 5, 2024 at 10:43 PM', location: 'Lost in Cafeteria', image: '/src/assets/necklace.png' },
    { id: 5, name: 'AQUAFLASK', date: 'October 5, 2024 at 10:43 PM', location: 'Lost in Cafeteria', image: '/src/assets/necklace.png' },
    { id: 6, name: 'AQUAFLASK', date: 'October 5, 2024 at 10:43 PM', location: 'Lost in Cafeteria', image: '/src/assets/necklace.png' },
    { id: 7, name: 'AQUAFLASK', date: 'October 5, 2024 at 10:43 PM', location: 'Lost in Cafeteria', image: '/src/assets/necklace.png' },
    { id: 8, name: 'AQUAFLASK', date: 'October 5, 2024 at 10:43 PM', location: 'Lost in Cafeteria', image: '/src/assets/necklace.png' },
    { id: 9, name: 'AQUAFLASK', date: 'October 5, 2024 at 10:43 PM', location: 'Lost in Cafeteria', image: '/src/assets/necklace.png' },
    { id: 10, name: 'AQUAFLASK', date: 'October 5, 2024 at 10:43 PM', location: 'Lost in Cafeteria', image: '/src/assets/necklace.png' },
];

const BrowseItems = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Topbar />

            {/* Main Content Wrapper */}
            <div className="w-full px-4 py-10 max-w-7xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Browse Items (Found)</h1>

                {/* Search Bar */}
                <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-8">
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-l-lg focus:outline-none"
                        placeholder="Search items..."
                    />
                    <button className="px-6 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                        🔍
                    </button>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center space-x-4 mb-8">
                    <Link to="/browseItemsLost" className="px-6 py-3 font-semibold bg-gray-200 text-gray rounded-lg hover:bg-blue-600">
                        Lost Items
                    </Link>
                    <Link to="/browseItemsFound" className="px-6 py-3 font-semibold bg-blue-500 text-white-700 rounded-lg hover:bg-blue-300">
                        Found Items
                    </Link>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {items.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                            <div className="p-4 text-center">
                                <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                                <p className="text-sm text-gray-600">{item.date}</p>
                                <p className="text-sm text-gray-600">{item.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BrowseItems;
