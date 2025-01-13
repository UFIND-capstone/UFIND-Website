// src/components/NotificationContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { db, collection, query, where, onSnapshot } from "../config/firebase";
import { useAuth } from "../AuthContext";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(true); // Track visibility of notification
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("participants", "array-contains", user.id));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const messagesRef = collection(db, `chats/${doc.id}/messages`);
          const qMessages = query(messagesRef, where("recipientId", "==", user.id), where("isRead", "==", false));

          onSnapshot(qMessages, (messageSnapshot) => {
            if (!messageSnapshot.empty && isVisible) {
              setNotification("You have unread messages");
            } else {
              setNotification(null);
            }
          });
        });
      });
      return () => unsubscribe();
    }
  }, [user, isVisible]);

  const dismissNotification = () => {
    setIsVisible(false); // Close the notification
    setNotification(null); // Optional: Clear the notification message as well
  };

  return (
    <NotificationContext.Provider value={{ notification, dismissNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};