import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase.js';

const db = getFirestore(firebaseApp);

export const addItem = async (itemData) => {
    try {
        const newItem = {
            ...itemData,
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