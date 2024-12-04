import { getFirestore, doc, updateDoc, collection, query, where, getDocs, addDoc, getDoc } from 'firebase/firestore';
import firebaseApp from '../firebase.js';

const db = getFirestore(firebaseApp);

export const updateUser = async (studentId, updates) => {
    const userQuery = query(collection(db, 'users'), where('studentId', '==', studentId));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
        return null;
    }

    const userDoc = userSnapshot.docs[0];
    const userRef = doc(db, 'users', userDoc.id);

    // Update user details in Firestore
    await updateDoc(userRef, updates);

    // Return updated data
    return { id: userDoc.id, ...userDoc.data(), ...updates };
};



export const getUser = async (studentId) => {

    const userQuery = query(collection(db, 'users'), where('studentId', '==', studentId));
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

export const getUserById = async (studentId) => {
    const userQuery = query(collection(db, 'users'), where('studentId', '==', studentId));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
        throw new Error('User not found');
    }

    const userDoc = userSnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
};
