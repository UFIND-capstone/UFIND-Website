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

export const getAllUsers = async () => {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
  
    if (snapshot.empty) {
      return []; // No users found
    }
  
    const users = [];
    snapshot.forEach((doc) => {
      if (doc.id !== 'admin') { // Exclude the document with id 'admin'
        users.push({ id: doc.id, ...doc.data() });
      }
    });
  
    return users;
};

export const updateUserStatus = async (id, status) => {
    const userRef = db.collection('users').doc(id);

    const userSnap = await userRef.get();
    if (!userSnap.exists) {
        return null; // User not found
    }

    // Update user status in Firestore
    await userRef.update({ status });

    // Return updated data
    return { id, ...userSnap.data(), status };
};
