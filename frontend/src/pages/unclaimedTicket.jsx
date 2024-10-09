import React from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topBar';

const unclaimedTickets = [
  {
    id: 1,
    fullName: 'Angelo Alfeche',
    itemDescription: 'Black Leather Wallet',
    location: 'Library',
    features: 'Small scratch on the left corner',
  },
  {
    id: 2,
    fullName: 'April Bakulyo',
    itemDescription: 'Blue Backpack',
    location: 'Cafeteria',
    features: 'Keychain of a yellow duck',
  },

  {
    id: 3,
    fullName: 'Ragheil Atacador',
    itemDescription: 'Blue Backpack',
    location: 'Cafeteria',
    features: 'Keychain of a yellow duck',
  },

  {
    id: 4,
    fullName: 'Josh Delos Cielos',
    itemDescription: 'Blue Backpack',
    location: 'Cafeteria',
    features: 'Keychain of a yellow duck',
  },
  {
    id: 5,
    fullName: 'Mel Alejandrino',
    itemDescription: 'Blue Backpack',
    location: 'Cafeteria',
    features: 'Keychain of a yellow duck',
  },
  {
    id: 6,
    fullName: 'Christopher Cuarteros',
    itemDescription: 'Blue Backpack',
    location: 'Cafeteria',
    features: 'Keychain of a yellow duck',
  },
  // Add more unclaimed tickets as needed
];

export const UnclaimedTicket = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full">
        {/* Topbar */}
        <Topbar />

        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-400 p-10">
          <h1 className="text-6xl text-white font-bold text-center mb-10">UNCLAIMED TICKETS</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {unclaimedTickets.map(ticket => (
              <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{ticket.fullName}</h2>

                <p className="text-gray-600 mb-2">
                  <strong>Item Description:</strong> {ticket.itemDescription}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Last Seen Location:</strong> {ticket.location}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Distinguishing Features:</strong> {ticket.features}
                </p>

                {/* Claim Ticket Button */}
                <button className="w-full py-3 bg-green-500 text-white font-semibold rounded">
                  Claim Ticket
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
