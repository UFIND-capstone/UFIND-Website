import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Footer from "../../components/user/footer";
import Topbar from "../../components/user/topBar";
import { useAuth } from "../../AuthContext";
import { db, collection, query, where, doc, getDoc, addDoc, getDocs, orderBy } from "../../config/firebase";

const ChatApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  
  const location = useLocation();  // Get location object
  const navigate = useNavigate();  // To navigate programmatically

  useEffect(() => {
    fetchChats();

    // Check if recipientId is in the query and fetch the contact info
    const params = new URLSearchParams(location.search);
    const recipientId = params.get("recipientId");

    if (recipientId) {
      openChatWithRecipient(recipientId);
    }
  }, [location.search]);  // Re-run effect when the URL changes

  const fetchChats = async () => {
    try {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("participants", "array-contains", user.id));
      const querySnapshot = await getDocs(q);
  
      const fetchedContacts = [];
  
      for (const docSnapshot of querySnapshot.docs) {
        const chatData = docSnapshot.data();
        const otherUserId = chatData.participants.find(p => p !== user.id);
        
        const otherUserRef = doc(db, "users", otherUserId);
        const otherUserDoc = await getDoc(otherUserRef);
  
        if (otherUserDoc.exists()) {
          const otherUserData = otherUserDoc.data();
          fetchedContacts.push({
            chatId: docSnapshot.id,
            otherUserId,
            otherUserData: {
              firstName: otherUserData.firstName,
              lastName: otherUserData.lastName
            },
            participants: chatData.participants
          });
        }
      }
  
      setContacts(fetchedContacts);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  const fetchMessages = async (chatId) => {
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);
    const fetchedMessages = querySnapshot.docs.map(doc => doc.data());
    setMessages(fetchedMessages);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
  
    const messageData = {
      senderId: user.id,
      recipientId: activeContact.otherUserId,
      content: newMessage.trim(),
      timestamp: new Date(),
    };
  
    try {
      let chatId = activeContact.chatId;
  
      // If no chatId exists, create a new chat document
      if (!chatId) {
        // Create a new chat document with the participants
        const newChatRef = await addDoc(collection(db, "chats"), {
          participants: [user.id, activeContact.otherUserId],
        });
  
        // Once the chat is created, get the chatId
        chatId = newChatRef.id;
  
        // Update the active contact to reflect the new chatId
        setActiveContact((prev) => ({ ...prev, chatId }));
      }
  
      // Now, send the message to the chat
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const messageDoc = await addDoc(messagesRef, messageData);
      const sentMessage = { ...messageData, id: messageDoc.id };
  
      // Update the state with the new message
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
  
      // Clear the new message input
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };
  

  const openChat = async (chat) => {
    setActiveContact(chat);
    setIsChatOpen(true);
    if (chat.chatId) {
      fetchMessages(chat.chatId);
    } else {
      setMessages([]);
    }
  };

  const openChatWithRecipient = async (recipientId) => {
    // Fetch the recipient data from the 'users' collection
    const recipientRef = doc(db, "users", recipientId);
    const recipientDoc = await getDoc(recipientRef);

    if (recipientDoc.exists()) {
      const recipientData = recipientDoc.data();

      // If the recipient data exists, open the chat
      const newContact = {
        otherUserId: recipientId,
        otherUserData: {
          firstName: recipientData.firstName,
          lastName: recipientData.lastName,
        },
        participants: [user.id, recipientId],
      };

      openChat(newContact);
    } else {
      console.error("Recipient not found");
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setActiveContact(null);
    setMessages([]);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.otherUserData.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                      message.senderId === user.id ? "justify-end" : "justify-start"
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
