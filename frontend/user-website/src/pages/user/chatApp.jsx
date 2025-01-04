import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import axios from "axios";
=======
import { useLocation, useNavigate } from "react-router-dom";
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
import { FaSearch } from "react-icons/fa";
import Footer from "../../components/user/footer";
import Topbar from "../../components/user/topBar";
import { useAuth } from "../../AuthContext";
<<<<<<< HEAD
import { useLocation } from "react-router-dom";
=======
import { db, collection, query, where, doc, getDoc, addDoc, getDocs, orderBy } from "../../config/firebase";
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a

const ChatApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
<<<<<<< HEAD

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
  
  
=======
  
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
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
  
    const messageData = {
      senderId: user.id,
      recipientId: activeContact.otherUserId,
      content: newMessage.trim(),
<<<<<<< HEAD
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
  
=======
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
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };
  

<<<<<<< HEAD
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

=======
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
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a

  const closeChat = () => {
    setIsChatOpen(false);
    setActiveContact(null);
    setMessages([]);
  };

<<<<<<< HEAD
=======
  const filteredContacts = contacts.filter(contact =>
    contact.otherUserData.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
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
<<<<<<< HEAD
                      message.senderId === user.id
                        ? "justify-end"
                        : "justify-start"
=======
                      message.senderId === user.id ? "justify-end" : "justify-start"
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
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
