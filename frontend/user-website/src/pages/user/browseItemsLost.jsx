import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/user/footer';
import Topbar from '../../components/user/topBar';
import axios from 'axios';

const BrowseItemsLost = () => {
    const [items, setItems] = useState([]); // All items from the API
    const [filteredItems, setFilteredItems] = useState([]); // Items filtered by search
    const [searchQuery, setSearchQuery] = useState(''); // User's search input
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const itemsPerPage = 9; // Number of items per page

    // Fetch lost items from the backend
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('https://mel-backend.jwisnetwork.com/api/items');
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                const lostItems = response.data.filter((item) => {
                    if (item.status === 'lost' && item.ticket === 'pending') {
                        const itemDate = new Date(item.dateTime.replace(' ', 'T'));
                        return itemDate > thirtyDaysAgo;
                    }
                    return false;
                });

                setItems(lostItems);
                setFilteredItems(lostItems); // Initially display all items
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
        setCurrentPage(1); // Reset to the first page after filtering
    };

    // Get current items for the page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    // Handle pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Topbar />

            {/* Main Content Wrapper */}
            <div className="w-full px-4 py-10 max-w-7xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">BROWSE ITEMS</h1>

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
                    <Link to="/browseItemsLost" className="px-6 py-3 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Lost Items
                    </Link>
                    <Link to="/browseItemsFound" className="px-6 py-3 font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-blue-300">
                        Found Items
                    </Link>
                </div>

                {/* Items Grid */}
                {loading ? (
                    <p className="text-center text-gray-500">Loading items...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : filteredItems.length === 0 ? (
                    <p className="text-center text-gray-500">No items found.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {currentItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/items/${item.id}`} // Dynamic link for each item's ID
                                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                                >
                                    <img
                                        src={item.imageUrl || '/placeholder-image.png'} // Fallback image if no URL
                                        alt={item.name}
                                        className="w-full h-48 object-cover object-cover"
                                    />
                                    <div className="p-4 text-center">
                                        <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                                        <p className="text-sm text-gray-600">{item.dateTime}</p>
                                        <p className="text-sm text-gray-600">{item.lastSeen}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 rounded-lg ${
                                        currentPage === index + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default BrowseItemsLost;
