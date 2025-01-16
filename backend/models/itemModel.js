import { db } from '../firebase.js';

export const updateItem = async (itemID, updateData) => {
  try {
      await db.collection('items').doc(itemID).update(updateData);
  } catch (error) {
      throw new Error(`Error updating item: ${error.message}`);
  }
};

export const deleteItem = async (itemID) => {
  try {
      await db.collection('items').doc(itemID).delete();
  } catch (error) {
      throw new Error(`Error deleting item: ${error.message}`);
  }
};

export const addItem = async (documentId, itemData) => {
  try {
      await db.collection('items').doc(documentId).set(itemData);
      return documentId;
  } catch (error) {
      throw new Error(`Error adding item: ${error.message}`);
  }
};

export const getItems = async () => {
  try {
      const snapshot = await db.collection('items').get();
      return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
  } catch (error) {
      throw new Error(`Error retrieving items: ${error.message}`);
  }
};

export const addClaimItem = async (claimData, itemId) => {
    try {
        // Use itemId as the document ID
        const docRef = await db.collection('CompletedClaims').doc(itemId).set(claimData);
        return itemId; // Return the itemId used as the document ID
    } catch (error) {
        throw new Error(`Error adding claim: ${error.message}`);
    }
  };
  

export const getItemsByUserId = async (studentId) => {
  try {
      const snapshot = await db.collection('items')
          .where('studentId', '==', studentId)
          .get();

      return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
  } catch (error) {
      throw new Error(`Error retrieving items: ${error.message}`);
  }
};

export const getPendingItem = async (status) => {
  try {
      const snapshot = await db.collection('items')
          .where('ticket', '==', status)
          .get();

      return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
  } catch (error) {
      throw new Error(`Error retrieving tickets: ${error.message}`);
  }
};

export const getItemById = async (itemID) => {
  try {
      const doc = await db.collection('items').doc(itemID).get();
      
      if (!doc.exists) {
          throw new Error('Item not found');
      }
      
      return { id: doc.id, ...doc.data() };
  } catch (error) {
      throw new Error(`Error retrieving item: ${error.message}`);
  }
};

export const getCompletedItem = async (itemID) => {
    try {
        const doc = await db.collection('CompletedClaims').doc(itemID).get();
        
        if (!doc.exists) {
            throw new Error('Item not found');
        }
        
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        throw new Error(`Error retrieving item: ${error.message}`);
    }
  };

export const editItem = async (itemId, updates) => {
    const itemRef = db.collection('items').doc(itemId); // Firestore document reference
  
    const itemSnap = await itemRef.get(); // Get item details
    if (!itemSnap.exists) {
      return null; // Return null if the item doesn't exist
    }
  
    // Update item details in Firestore
    await itemRef.update(updates);
  
    // Return updated item with new values
    return { id: itemId, ...itemSnap.data(), ...updates };
  };
  