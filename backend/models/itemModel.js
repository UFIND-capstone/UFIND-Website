import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import firebaseApp from '../firebase.js';

const db = getFirestore(firebaseApp);

export const addItem = async (itemData) => {
    try {
        const newItem = {
            ...itemData, // Include all fields, including imageURL
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
        const itemsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return itemsList; // Return the list of items
    } catch (error) {
        throw new Error('Error retrieving items: ' + error.message);
    }
};

export const getItemById = async (itemID) => {
    try {
        const docRef = doc(db, 'items', itemID); // Reference to the specific item
        const docSnap = await getDoc(docRef); // Fetch the document

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }; // Return the item if it exists
        } else {
            throw new Error('Item not found'); // Return error if no item exists
        }
    } catch (error) {
        throw new Error('Error retrieving item: ' + error.message);
    }
};
