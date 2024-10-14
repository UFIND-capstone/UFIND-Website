import express from 'express';
import { addItemHandler } from '../controllers/itemController.js';
import { getItemsHandler } from '../controllers/itemController.js'; // Import the new handler

const router = express.Router();

router.post('/items', addItemHandler); // Route for adding items
router.get('/items', getItemsHandler);  // Route for getting all items

export default router;