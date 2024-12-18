import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Footer from "../../components/user/footer";
import Topbar from "../../components/user/topBar";
import { useAuth } from "../../AuthContext";
import { useLocation } from "react-router-dom";

const ChatApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const recipientId = queryParams.get("recipientId");

    if (recipientId) {
      // Automatically fetch contact and open chat
      fetchChatByRecipientId(recipientId);
    }
  }, [location]);

  const fetchChatByRecipientId = async (recipientId) => {
    try {
      const response = await axios.post("http://localhost:3000/api/getChats", {
        userId: user.id,
      });
      const contact = response.data.find((c) => c.otherUserId === recipientId);
  
      if (contact) {
        // Open the existing chat
        openChat(contact);
      } else {
        // Fetch recipient's name dynamically
        const userResponse = await axios.get(
          `http://localhost:3000/api/user/${recipientId}`
        );
  
        setActiveContact({
          otherUserId: recipientId,
          otherUserData: {
            firstName: userResponse.data.firstName,
            lastName: userResponse.data.lastName,
          },
        });
        setIsChatOpen(true);
        setMessages([]); // Clear messages since it's a new chat
      }
    } catch (error) {
      console.error("Error fetching chat or recipient user details", error);
    }
  };
  
  

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
  
    const messageData = {
      senderId: user.id,
      recipientId: activeContact.otherUserId,
      content: newMessage.trim(),
    };
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/messages",
        messageData
      );
      setMessages((prevMessages) => [...prevMessages, response.data]);
  
      // If the chatId wasn't available before, it might now be returned by the backend
      if (!activeContact.chatId && response.data.chatId) {
        setActiveContact((prev) => ({ ...prev, chatId: response.data.chatId }));
      }
  
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };
  

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = user.id;
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

  const filteredContacts = contacts.filter((contact) =>
    contact.otherUserData.firstName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openChat = async (chat) => {
  setActiveContact(chat);
  setIsChatOpen(true);

  if (chat.chatId) {
    // Fetch messages for existing chat
    try {
      const response = await axios.get(
        `http://localhost:3000/api/messages/${chat.chatId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  } else {
    // No messages yet for new chat
    setMessages([]);
  }
};


  const closeChat = () => {
    setIsChatOpen(false);
    setActiveContact(null);
    setMessages([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1 mt-5 mb-5 mx-5 space-x-5">
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
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-2/3 bg-white border border-gray-300 rounded-lg shadow-md">
          {isChatOpen ? (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-3">
                <h2>
                  {activeContact.otherUserData.firstName}{" "}
                  {activeContact.otherUserData.lastName}
                </h2>
                <button onClick={closeChat}>Back</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.senderId === user.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        message.senderId === user.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 flex items-center border-t">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
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
