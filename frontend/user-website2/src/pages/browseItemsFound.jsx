import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import axios from 'axios';

const BrowseItemsFound = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);  // Added state for filtered items
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Added state for search query

    // Fetch lost items from the backend
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/items');
                const lostItems = response.data.filter(item => item.status === 'found');
                setItems(lostItems);
                setFilteredItems(lostItems); // Set filteredItems initially as all items
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch items');
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Handle search input changes
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter items based on description, detailedDescription, or name
        const filtered = items.filter(item => {
            const { description = '', detailedDescription = '', name = '' } = item;
            return (
                description.toLowerCase().includes(query) ||
                detailedDescription.toLowerCase().includes(query) ||
                name.toLowerCase().includes(query)
            );
        });

        setFilteredItems(filtered);
    };

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
                        value={searchQuery} // Controlled input
                        onChange={handleSearch} // Update search query on input change
                    />
                    <button className="px-6 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                        🔍
                    </button>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center space-x-4 mb-8">
                    <Link to="/browseItemsLost" className="px-6 py-3 font-semibold bg-gray-200 text-black rounded-lg hover:bg-blue-600">
                        Lost Items
                    </Link>
                    <Link to="/browseItemsFound" className="px-6 py-3 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-300">
                        Found Items
                    </Link>
                </div>

                {/* Items Grid */}
                {loading ? (
                    <p className="text-center text-gray-500">Loading items...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredItems.map((item) => (
                            <Link
                            key={item.id}
                            to={`/items/${item.id}`} // Dynamic link for each item's ID
                            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                        >
                            <img
                                src={item.imageUrl || '/placeholder-image.png'} // Fallback image if no URL
                                alt={item.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-center">
                                <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                                <p className="text-sm text-gray-600">{item.dateTime}</p>
                                <p className="text-sm text-gray-600">{item.lastSeen}</p>
                            </div>
                        </Link>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default BrowseItemsFound;
