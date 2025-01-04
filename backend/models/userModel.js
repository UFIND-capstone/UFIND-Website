// models/userModel.js
import { db } from '../firebase.js';

export const updateUser = async (studentId, updates) => {
    const userRef = db.collection('users').doc(studentId);

    const userSnap = await userRef.get();
    if (!userSnap.exists) {
        return null; // User not found
    }

    // Update user details in Firestore
    await userRef.update(updates);

    // Return updated data
    return { id: studentId, ...userSnap.data(), ...updates };
};

export const getUser = async (studentId) => {
    const userRef = db.collection('users').doc(studentId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
        return null; // User not found
    }

    return { id: studentId, ...userSnap.data() };
};

export const addUser = async (userData) => {
    const { studentId, ...restData } = userData;
    const userRef = db.collection('users').doc(studentId);

    try {
        await userRef.set(restData); // Store user details in Firestore
        return studentId; // Return the document ID
    } catch (error) {
        throw new Error("Error adding user: " + error.message);
    }
};

export const getUserById = async (studentId) => {
    const userRef = db.collection('users').doc(studentId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
        throw new Error('User not found');
    }

    return { id: studentId, ...userSnap.data() };
};