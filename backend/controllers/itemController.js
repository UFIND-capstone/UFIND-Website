import { addItem } from '../models/itemModel.js';
import { getItems } from '../models/itemModel.js';

export const getItemsHandler = async (req, res) => {
    try {
        const items = await getItems();
        res.status(200).json(items); // Send the list of items as a response
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const addItemHandler = async (req, res) => {
    const { name, description, lastSeen, status } = req.body;

    if (!name || !description || !lastSeen || !status) {
        return res.status(400).json({ message: 'Name, description, last seen, and status are required' });
    }

    try {
        const itemId = await addItem({ name, description, lastSeen, status });
        res.status(201).json({ message: 'Item added successfully', itemId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};