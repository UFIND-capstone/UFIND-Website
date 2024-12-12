import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import { useAuth } from "../AuthContext";

const ChatApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    const messageData = {
      senderId: user.id, // Replace `user.id` with actual sender ID
      recipientId: activeContact.otherUserId, // Replace with the recipient's ID
      content: newMessage.trim(),
    };

    try {
      // Send the message to the backend
      const response = await axios.post(
        "http://localhost:3000/api/messages",
        messageData
      );
      // Update the local state with the new message
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  // Fetch chats from the backend
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = user.id; // Replace with actual user ID
        const response = await axios.post(
          "http://localhost:3000/api/getChats",
          { userId }
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching chats", error);
      }
    };
    fetchChats();
  }, []);

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter((contact) =>
    contact.otherUserData.firstName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openChat = async (chat) => {
    setActiveContact(chat);
    setIsChatOpen(true);

    // Fetch messages for the selected chat
    console.log(chat.chatId);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/messages/${chat.chatId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setActiveContact(null);
    setMessages([]);
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
            {filteredContacts.map((contact) => (
              <li
                key={contact.chatId}
                className="p-4 flex items-center hover:bg-gray-100 cursor-pointer"
                onClick={() => openChat(contact)}
              >
                <img
                  src="/src/assets/defaultProfile.png"
                  alt={contact.otherUserData.firstName}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-bold">
                    {contact.otherUserData.firstName}{" "}
                    {contact.otherUserData.lastName}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {contact.otherUserData.contactNumber}
                  </p>
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
                    alt={activeContact.otherUserData.firstName}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <h2 className="text-lg font-bold">
                    {activeContact.otherUserData.firstName}{" "}
                    {activeContact.otherUserData.lastName}
                  </h2>
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
                {messages.length === 0 ? (
                  <p className="text-center text-gray-500">No messages yet.</p>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`max-w-xs p-2 rounded-lg ${
                        message.senderId === activeContact.otherUserId
                          ? "bg-blue-100 self-start"
                          : "bg-blue-500 text-white self-end"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="bg-white px-4 py-3 flex items-center border-t">
                <input
                  type="text"
                  placeholder="Chat message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
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
