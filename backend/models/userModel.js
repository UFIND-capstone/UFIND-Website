import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import firebaseApp from '../firebase.js';

const db = getFirestore(firebaseApp);

export const getUser = async (contactNumber) => {

    const userQuery = query(collection(db, 'users'), where('contactNumber', '==', contactNumber));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
        return null;
    }

    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return userList[0];
};

export const addUser = async (userData) => {
    try {
        // Add user data to Firestore
        const docRef = await addDoc(collection(db, 'users'), userData);
        return docRef.id; // Return the ID of the newly created document
    } catch (error) {
        throw new Error('Error adding user: ' + error.message);
    }
};