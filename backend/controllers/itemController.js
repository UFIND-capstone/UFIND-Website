import { addItem, getItems, getItemById } from '../models/itemModel.js';

export const getItemsHandler = async (req, res) => {
    try {
        const items = await getItems();
        res.status(200).json(items); // Send the list of items as a response
    } catch (error) {
        res.status(500).json({ message: `Error retrieving items: ${error.message}` });
    }
};

export const getItemByIdHandler = async (req, res) => {
    const { itemID } = req.params; // Get the item ID from URL parameters

    try {
        const item = await getItemById(itemID); // Fetch item by ID
        res.status(200).json(item); // Send the item data as a response
    } catch (error) {
        res.status(500).json({ message: `Error retrieving item: ${error.message}` });
    }
};

export const addItemHandler = async (req, res) => {
    const {
        name,
        description,
        dateTime,
        fullName,
        contactNumber,
        email,
        detailedDescription,
        status,
        imageUrl,
    } = req.body;

    // Validate required fields
    if (!name || !description || !dateTime || !fullName || !contactNumber || !email || !detailedDescription || !status || !imageUrl) {
        return res.status(400).json({
            message: 'All fields are required: name, description, dateTime, fullName, contactNumber, email, detailedDescription, status, and imageURL.',
        });
    }

    try {
        const itemId = await addItem({
            name,
            description,
            dateTime,
            fullName,
            contactNumber,
            email,
            detailedDescription,
            status,
            imageUrl, // Pass imageURL to the model
        });
        res.status(201).json({ message: 'Item added successfully', itemId });
    } catch (error) {
        res.status(500).json({ message: `Error adding item: ${error.message}` });
    }
};

