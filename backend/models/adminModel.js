import { db } from '../firebase.js';

export const getAdmin = async (username) => {
    try {
        const adminSnapshot = await db.collection('admin')
            .where('username', '==', username)
            .get();

        if (adminSnapshot.empty) {
            return null;
        }

        const adminDoc = adminSnapshot.docs[0];
        return { id: adminDoc.id, ...adminDoc.data() };
    } catch (error) {
        throw new Error(`Error getting admin: ${error.message}`);
    }
};