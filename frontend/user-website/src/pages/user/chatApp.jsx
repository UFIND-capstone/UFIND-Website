import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Footer from "../../components/user/footer";
import Topbar from "../../components/user/topBar";
import { useAuth } from "../../AuthContext";
import { db, collection, query, where, doc, getDoc, addDoc, getDocs, orderBy, onSnapshot, setDoc } from "../../config/firebase";

const ChatApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();

    const params = new URLSearchParams(location.search);
    const recipientId = params.get("recipientId");

    if (recipientId) {
      openChatWithRecipient(recipientId);
    }
  }, [location.search]);

  useEffect(() => {
    if (activeContact && activeContact.chatId) {
      const messagesRef = collection(db, `chats/${activeContact.chatId}/messages`);
      const q = query(messagesRef, orderBy("timestamp", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = querySnapshot.docs.map(doc => doc.data());
        setMessages(fetchedMessages);
      });

      return () => unsubscribe();
    }
  }, [activeContact]);

  const fetchChats = async () => {
    try {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("participants", "array-contains", user.id));
      const querySnapshot = await getDocs(q);

      const fetchedContacts = [];
      const userDocCache = {}; // Cache to store user documents

      for (const docSnapshot of querySnapshot.docs) {
        const chatData = docSnapshot.data();
        const otherUserId = chatData.participants.find(p => p !== user.id);

        if (!userDocCache[otherUserId]) {
          const otherUserRef = doc(db, "users", otherUserId);
          const otherUserDoc = await getDoc(otherUserRef);
          userDocCache[otherUserId] = otherUserDoc.exists() ? otherUserDoc.data() : null;
        }

        if (userDocCache[otherUserId]) {
          const otherUserData = userDocCache[otherUserId];
          fetchedContacts.push({
            chatId: docSnapshot.id,
            otherUserId,
            otherUserData: {
              firstName: otherUserData.firstName,
              lastName: otherUserData.lastName,
            },
            participants: chatData.participants,
          });
        }
      }

      setContacts(fetchedContacts);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
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

      if (!chatId) {
        // Use the desired document id format
        const newChatRef = await setDoc(doc(db, "chats", `${user.id}_${activeContact.otherUserId}`), {
          participants: [user.id, activeContact.otherUserId],
        });
        chatId = newChatRef.id;
        setActiveContact((prev) => ({ ...prev, chatId }));
      }

      const messagesRef = collection(db, `chats/${chatId}/messages`);
      await addDoc(messagesRef, messageData);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
};


  const openChat = async (chat) => {
    setActiveContact(chat);
    setIsChatOpen(true);
  };

  const openChatWithRecipient = async (recipientId) => {
    const recipientRef = doc(db, "users", recipientId);
    const recipientDoc = await getDoc(recipientRef);

    if (recipientDoc.exists()) {
      const recipientData = recipientDoc.data();
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

  const filteredContacts = contacts.filter((contact) =>
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
                    {contact.otherUserData.firstName} {contact.otherUserData.lastName}
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
                  {activeContact.otherUserData.firstName} {activeContact.otherUserData.lastName}
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
            <div className="flex items-center justify-center h-full">Select a conversation to start chatting</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatApp;
