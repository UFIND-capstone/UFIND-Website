import { db } from '../firebase.js';

async function getUserDataById(userId) {
  try {
      const doc = await db.collection('users').doc(userId).get();
      return doc.exists ? doc.data() : null;
  } catch (error) {
      throw new Error(`Error getting user data: ${error.message}`);
  }
}

export const messageModel = {
  async createOrGetChat(senderId, recipientId) {
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