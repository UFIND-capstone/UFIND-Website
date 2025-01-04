import { db } from '../firebase.js';
import { Router } from 'express';
const router = Router();


router.get('/getNotifications', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Get items for the user
        const itemsSnapshot = await db.collection('items')
            .where('studentId', '==', userId)
            .get();

        if (itemsSnapshot.empty) {
            return res.status(404).json({ 
                message: 'No items found for this user.' 
            });
        }

        const itemIds = itemsSnapshot.docs.map(doc => doc.id);

        // Get claims for those items
        const claimsSnapshot = await db.collection('Claim')
            .where('itemId', 'in', itemIds)
            .get();

        if (claimsSnapshot.empty) {
            return res.status(404).json({ 
                message: 'No claims found for this user.' 
            });
        }

        const notifications = claimsSnapshot.docs.map(doc => ({
            id: doc.id,
            message: `Someone is trying to claim your item: ${doc.data().name}`,
            claimDetails: doc.data()
        }));

        res.json({ notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ 
            message: 'Error fetching notifications' 
        });
    }
});

export default router;
