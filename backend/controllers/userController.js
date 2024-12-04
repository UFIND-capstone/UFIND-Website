import { getUser, addUser, updateUser, getUserById } from '../models/userModel.js';

export const updateUserHandler = async (req, res) => {
    const { studentId, contactNumber, emailAddress, firstName} = req.body;

    if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required' });
    }

    try {
        const updates = {
            ...(contactNumber && { contactNumber }),
            ...(emailAddress && { emailAddress }),
            ...(firstName && { firstName }),
        };

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No updates provided' });
        }

        const updatedUser = await updateUser(studentId, updates);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error("Error in updateUserHandler:", error);
        res.status(500).send(error.message);
    }
};



export const getUserHandler = async (req, res) => {
    const { studentId, password } = req.body;

    try {
        const user = await getUser(studentId);

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
    const { firstName, lastName, emailAddress, contactNumber, password, studentId } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !emailAddress || !contactNumber || !password || !studentId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newUser = {
            firstName,
            lastName,
            emailAddress,
            contactNumber,
            password,
            studentId
        };

        const userId = await addUser(newUser);
        res.status(201).json({ message: 'User added successfully', userId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getUserByIdHandler = async (req, res) => {
    const { studentId } = req.params; // Get the item ID from URL parameters

    try {
        const user = await getUserById(studentId); // Fetch item by ID
        res.status(200).json(user); // Send the item data as a response
    } catch (error) {
        res.status(500).json({ message: `Error retrieving user: ${error.message}` });
    }
};