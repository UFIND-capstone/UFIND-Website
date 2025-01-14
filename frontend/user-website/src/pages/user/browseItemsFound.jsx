import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/user/footer';
import Topbar from '../../components/user/topBar';
import axios from 'axios';

const BrowseItemsFound = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/items');
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
            const lostItems = response.data.filter((item) => {
              if (item.status === 'found' && item.ticket === 'pending') {
                const itemDate = new Date(item.dateTime.replace(' ', 'T'));
                return itemDate > thirtyDaysAgo;
              }
              return false;
            });
      
            setItems(lostItems);
            setFilteredItems(lostItems);
            setLoading(false);
          } catch (err) {
            setError(err.message || 'Failed to fetch items');
            setLoading(false);
          }
        };
      
        fetchItems();
      }, []);
      

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

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

            <div className="w-full px-4 py-10 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">BROWSE ITEMS</h1>

                <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-8">
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-l-lg focus:outline-none"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className="px-6 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                        🔍
                    </button>
                </div>

                <div className="flex justify-center space-x-4 mb-8">
                    <Link to="/browseItemsLost" className="px-6 py-3 font-semibold bg-gray-200 text-black rounded-lg hover:bg-blue-600">
                        Lost Items
                    </Link>
                    <Link to="/browseItemsFound" className="px-6 py-3 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-300">
                        Found Items
                    </Link>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading items...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {filteredItems.map((item) => (
                            <Link
                                key={item.id}
                                to={`/items/${item.id}`}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                            >
                                <div className="blur-container">
                                    <img
                                        src={item.imageUrl || '/placeholder-image.png'}
                                        alt={item.name}
                                        className="w-full h-48 object-cover filter blur-lg"
                                    />
                                    <div className="p-4 text-center">
                                        <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                                        <p className="text-sm text-gray-600">{item.dateTime}</p>
                                        <p className="text-sm text-gray-600">{item.lastSeen}</p>
                                    </div>
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
