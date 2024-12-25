import React from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from '../components/sideBar';
import Topbar from '../components/topBar';

// Sample data for multiple items
const items = [
  {
    id: 1,
    itemName: "Water Bottle",
    fullName: "Frince Villarte",
    location: "Outside Cafeteria",
    description: "Dark Green bottle",
    dateTime: "June 24, 2024",
    contactNumber: "09265834603",
    email: "frince04@gmail.com",
    image: "/src/assets/water-bottle.png", // Replace with your actual image path
  },
  {
    id: 2,
    itemName: "Umbrella",
    fullName: "John Doe",
    location: "Library",
    description: "Black umbrella",
    dateTime: "June 20, 2024",
    contactNumber: "09123456789",
    email: "john.doe@gmail.com",
    image: "/src/assets/umbrella.png", // Replace with your actual image path
  },
];

const ItemDescription = () => {
  const { id } = useParams();
  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    return <div className="p-6 text-center text-red-500">Item not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <div className="text-4xl font-bold">U-Find</div>
        <div className="flex items-center space-x-4">
          <button className="text-white">
            <i className="fas fa-bell"></i>
          </button>
          <img
            src="/src/assets/PROFILE.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/6 bg-white shadow-lg p-6">
          <div className="text-center mb-6">
            <img
              src="/src/assets/PROFILE.png"
              alt="Admin"
              className="w-16 h-16 mx-auto rounded-full"
            />
            <h2 className="mt-2 font-bold text-lg">Jared Rara</h2>
          </div>

          <nav>
            <ul className="space-y-4">
              <li className="hover:text-blue-500">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/itemLost">Item Lost</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/itemFound">Item Found</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/activeTicket">Active Tickets</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/turnoverTicket">Turnover Tickets</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/unclaimedTicket">Unclaimed Tickets</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/myAccount">My Account</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/">Logout</Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Item Description Content */}
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-6 text-center">ITEM DESCRIPTION</h1>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Section */}
              <div className="flex justify-center">
                <img
                  src={item.image}
                  alt={item.itemName}
                  className="w-64 h-64 object-cover rounded-lg"
                />
              </div>

              {/* Details Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">{item.itemName}</h2>

                <div className="mb-2">
                  <strong>FULL NAME:</strong>
                  <div className="border p-2 rounded">{item.fullName}</div>
                </div>

                <div className="mb-2">
                  <strong>LAST SEEN LOCATION:</strong>
                  <div className="border p-2 rounded">{item.location}</div>
                </div>

                <div className="mb-2">
                  <strong>DESCRIPTION:</strong>
                  <div className="border p-2 rounded">{item.description}</div>
                </div>

                <div className="mb-2">
                  <strong>DATE & TIME:</strong>
                  <div className="border p-2 rounded">{item.dateTime}</div>
                </div>

                <h3 className="text-xl font-bold mt-4 mb-2">Contact Details</h3>

                <div className="mb-2">
                  <strong>FULL NAME:</strong>
                  <div className="border p-2 rounded">{item.fullName}</div>
                </div>

                <div className="mb-2">
                  <strong>CONTACT NUMBER:</strong>
                  <div className="border p-2 rounded">{item.contactNumber}</div>
                </div>

                <div className="mb-2">
                  <strong>E-MAIL ADDRESS:</strong>
                  <div className="border p-2 rounded">{item.email}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © U-Find Philippines 2024
      </footer>
    </div>
  );
};

export default ItemDescription;
