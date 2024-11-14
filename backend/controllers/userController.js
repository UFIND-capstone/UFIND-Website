import { getUser, addUser } from '../models/userModel.js';

export const getUserHandler = async (req, res) => {
    const { contactNumber, password } = req.body;

    try {
        const user = await getUser(contactNumber);

        if (user && user.password === password) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const addUserHandler = async (req, res) => { 
    const { firstName, lastName, emailAddress, contactNumber, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !emailAddress || !contactNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newUser = {
            firstName,
            lastName,
            emailAddress,
            contactNumber,
            password
        };

        const userId = await addUser(newUser);
        res.status(201).json({ message: 'User added successfully', userId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};