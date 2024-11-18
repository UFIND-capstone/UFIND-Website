import express from 'express';
import { addItemHandler, getItemByIdHandler, getItemsHandler } from '../controllers/itemController.js';

const router = express.Router();

router.post('/items', addItemHandler); // Route for adding items
router.get('/items', getItemsHandler);  // Route for getting all items
router.get('/items/:itemID', getItemByIdHandler);

export default router;