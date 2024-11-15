import { addItem, getItems } from '../models/itemModel.js';

export const getItemsHandler = async (req, res) => {
    try {
        const items = await getItems();
        res.status(200).json(items); // Send the list of items as a response
    } catch (error) {
        res.status(500).json({ message: `Error retrieving items: ${error.message}` });
    }
};

export const addItemHandler = async (req, res) => {
    const {
        name,
        description,
        lastSeen,
        dateTime,
        category,
        fullName,
        contactNumber,
        email,
        detailedDescription,
        status,
    } = req.body;

    // Validate required fields
    if (!name || !description || !lastSeen || !dateTime || !category || !fullName || !contactNumber || !email || !detailedDescription || !status) {
        return res.status(400).json({
            message: 'All fields are required: name, description, last seen, dateTime, category, fullName, contactNumber, email, detailedDescription, and status.',
        });
    }

    try {
        const itemId = await addItem({
            name,
            description,
            lastSeen,
            dateTime,
            category,
            fullName,
            contactNumber,
            email,
            detailedDescription,
            status,
        });
        res.status(201).json({ message: 'Item added successfully', itemId });
    } catch (error) {
        res.status(500).json({ message: `Error adding item: ${error.message}` });
    }
};
