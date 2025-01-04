<<<<<<< HEAD
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, onSnapshot, doc, setDoc, getDoc,  } from "firebase/firestore";
import firebaseApp from '../firebase.js';

const db = getFirestore(firebaseApp);

async function getUserDataById(userId) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data(); // Return user data if the document exists
  }
  return null; // Return null if user not found
=======
import { db } from '../firebase.js';

async function getUserDataById(userId) {
  try {
      const doc = await db.collection('users').doc(userId).get();
      return doc.exists ? doc.data() : null;
  } catch (error) {
      throw new Error(`Error getting user data: ${error.message}`);
  }
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
}

export const messageModel = {
  async createOrGetChat(senderId, recipientId) {
<<<<<<< HEAD
    // Create a consistent chat ID by sorting participant IDs
    const participants = [senderId, recipientId].sort();
    const chatId = `${participants[0]}_${participants[1]}`;

    const chatRef = doc(db, "chats", chatId);

    // Check if the chat exists, otherwise create it
    await setDoc(chatRef, { participants }, { merge: true });
    return chatId;
  },

  async createMessage(chatId, message) {
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    return await addDoc(messagesRef, message);
  },

  async fetchMessages(chatId) {
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  listenToMessages(chatId, callback) {
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    return onSnapshot(q, snapshot => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(messages);
    });
  },

  async getChatIdByUser(userId) {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participants", "array-contains", userId));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const chatDoc = querySnapshot.docs[0]; // Assuming only one chat with the user
      return chatDoc.id;
    }

    return null; // No chat found
  },

  async getChatsByUser(userId) {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participants", "array-contains", userId));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const chatDataPromises = querySnapshot.docs.map(async (doc) => {
        const chatData = doc.data();
        const otherParticipant = chatData.participants.filter(participant => participant !== userId)[0]; // Get the opposing user ID

        // Fetch the data of the opposing user
        const otherUserData = await getUserDataById(otherParticipant);

        return {
          chatId: doc.id,
          otherUserId: otherParticipant,
          otherUserData, // Include the data of the other user
          participants: chatData.participants
        };
      });

      const chatsData = await Promise.all(chatDataPromises); // Wait for all promises to resolve
      return chatsData;
    }

    return []; // Return an empty array if no chats are found
  },  
};
=======
      const participants = [senderId, recipientId].sort();
      const chatId = `${participants[0]}_${participants[1]}`;

      await db.collection('chats').doc(chatId).set({ 
          participants 
      }, { merge: true });

      return chatId;
  },

  async createMessage(chatId, message) {
      const docRef = await db.collection('chats')
          .doc(chatId)
          .collection('messages')
          .add(message);
      return docRef.id;
  },

  async fetchMessages(chatId) {
      const snapshot = await db.collection('chats')
          .doc(chatId)
          .collection('messages')
          .orderBy('timestamp', 'asc')
          .get();

      return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
  },

  listenToMessages(chatId, callback) {
      return db.collection('chats')
          .doc(chatId)
          .collection('messages')
          .orderBy('timestamp', 'asc')
          .onSnapshot(snapshot => {
              const messages = snapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
              }));
              callback(messages);
          });
  },

  async getChatIdByUser(userId) {
      const snapshot = await db.collection('chats')
          .where('participants', 'array-contains', userId)
          .limit(1)
          .get();

      return snapshot.empty ? null : snapshot.docs[0].id;
  },

  async getChatsByUser(userId) {
      const snapshot = await db.collection('chats')
          .where('participants', 'array-contains', userId)
          .get();

      const chatDataPromises = snapshot.docs.map(async (doc) => {
          const chatData = doc.data();
          const otherParticipant = chatData.participants.find(
              participant => participant !== userId
          );
          const otherUserData = await getUserDataById(otherParticipant);

          return {
              chatId: doc.id,
              otherUserId: otherParticipant,
              otherUserData,
              participants: chatData.participants
          };
      });

      return Promise.all(chatDataPromises);
  }
};
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
