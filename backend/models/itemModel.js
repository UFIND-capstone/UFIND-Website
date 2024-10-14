import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase.js';

const db = getFirestore(firebaseApp);

export const addItem = async (itemData) => {
    try {
        const timestamp = new Date();
        
        // Adjust for Philippine Standard Time (UTC+8)
        const utcOffset = 8 * 60; // UTC+8 in minutes
        const localDate = new Date(timestamp.getTime() + (utcOffset * 60 * 1000));
        
        const newItem = {
            ...itemData,
            dateAdded: localDate.toISOString().split('T')[0], // YYYY-MM-DD format
            timeAdded: localDate.toISOString().split('T')[1].split('.')[0], // HH:MM:SS format
            category: 'Ticketing',
        };

        const docRef = await addDoc(collection(db, 'items'), newItem);
        return docRef.id; // Return the ID of the newly created document
    } catch (error) {
        throw new Error('Error adding item: ' + error.message);
    }
};

export const getItems = async () => {
    try {
        const itemsCollection = collection(db, 'items');
        const snapshot = await getDocs(itemsCollection);
        const itemsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return itemsList; // Return the list of items
    } catch (error) {
        throw new Error('Error retrieving items: ' + error.message);
    }
};