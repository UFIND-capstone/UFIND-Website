<<<<<<< HEAD
import { getFirestore, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import firebaseApp from '../firebase.js';

const db = getFirestore(firebaseApp);

export const updateUser = async (studentId, updates) => {
    const userRef = doc(db, 'users', studentId); // Directly reference the document by studentId

    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
=======
// models/userModel.js
import { db } from '../firebase.js';

export const updateUser = async (studentId, updates) => {
    const userRef = db.collection('users').doc(studentId);

    const userSnap = await userRef.get();
    if (!userSnap.exists) {
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
        return null; // User not found
    }

    // Update user details in Firestore
<<<<<<< HEAD
    await updateDoc(userRef, updates);
=======
    await userRef.update(updates);
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a

    // Return updated data
    return { id: studentId, ...userSnap.data(), ...updates };
};

<<<<<<< HEAD



export const getUser = async (studentId) => {
    const userRef = doc(db, 'users', studentId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
=======
export const getUser = async (studentId) => {
    const userRef = db.collection('users').doc(studentId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
        return null; // User not found
    }

    return { id: studentId, ...userSnap.data() };
};

<<<<<<< HEAD

export const addUser = async (userData) => {
    const { studentId, ...restData } = userData;
    const userRef = doc(db, "users", studentId);

    try {
        await setDoc(userRef, restData); // Store user details in Firestore
=======
export const addUser = async (userData) => {
    const { studentId, ...restData } = userData;
    const userRef = db.collection('users').doc(studentId);

    try {
        await userRef.set(restData); // Store user details in Firestore
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
        return studentId; // Return the document ID
    } catch (error) {
        throw new Error("Error adding user: " + error.message);
    }
};

<<<<<<< HEAD

export const getUserById = async (studentId) => {
    const userRef = doc(db, 'users', studentId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
=======
export const getUserById = async (studentId) => {
    const userRef = db.collection('users').doc(studentId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
        throw new Error('User not found');
    }

    return { id: studentId, ...userSnap.data() };
<<<<<<< HEAD
};

=======
};
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
