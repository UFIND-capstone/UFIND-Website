import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";

const ChatApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const contacts = [
    { name: "Jared Salvan", message: "Hello, have you seen my items?" },
    { name: "Jowana Shayn", message: "Hello, have you seen my items?" },
    { name: "Prince Charlang", message: "Hello, have you seen my items?" },
    { name: "Rey Valera", message: "Hello, have you seen my items?" },
    { name: "Bobby Stark", message: "Hello, have you seen my items?" },
    { name: "Rickyboy", message: "Hello, have you seen my items?" },
  ];

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openChat = (contact) => {
    setActiveContact(contact);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setActiveContact(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="flex flex-1 mt-5 mb-5 mx-5 space-x-5">
        {/* Messages List */}
        <div className="w-1/3 bg-white border border-gray-300 rounded-lg shadow-md">
          <div className="p-4 border-b flex items-center space-x-2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search Messages"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>
          <ul className="overflow-y-auto">
            {filteredContacts.map((contact, index) => (
              <li
                key={index}
                className="p-4 flex items-center hover:bg-gray-100 cursor-pointer"
                onClick={() => openChat(contact)}
              >
                <img
                  src="/src/assets/defaultProfile.png"
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-bold">{contact.name}</h3>
                  <p className="text-gray-500 text-sm">{contact.message}</p>
                </div>
              </li>
            ))}
            {filteredContacts.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No contacts found.
              </p>
            )}
          </ul>
        </div>

        {/* Chat Panel */}
        <div className="w-2/3 bg-white border border-gray-300 rounded-lg shadow-md">
          {isChatOpen ? (
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-3">
                <div className="flex items-center">
                  <img
                    src="/src/assets/defaultProfile.png"
                    alt={activeContact.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <h2 className="text-lg font-bold">{activeContact.name}</h2>
                </div>
                <button
                  className="text-white text-lg font-semibold"
                  onClick={closeChat}
                >
                  Back
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="space-x-4">
                  <div className="self-start max-w-xs bg-blue-100 rounded-lg p-2">
                    <p>Hi, have you seen my items?</p>
                  </div>
                  <div className="self-end max-w-xs bg-blue-500 text-white rounded-lg p-2">
                    <p>Yes, I found here at CSM Bldg</p>
                  </div>
                  <div className="self-start max-w-xs bg-blue-100 rounded-lg p-2">
                    <p>Where are you now? Can we meet up right now?</p>
                  </div>
                  <div className="self-end max-w-xs bg-blue-500 text-white rounded-lg p-2">
                    <p>I'm here at cafeteria sitting around</p>
                  </div>
                  <div className="self-start max-w-xs bg-blue-100 rounded-lg p-2">
                    <p>Okay, I’m going right now</p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="bg-white px-4 py-3 flex items-center border-t">
                <input
                  type="text"
                  placeholder="Chat message"
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
                />
                <button className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChatApp;
