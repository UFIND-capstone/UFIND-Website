import { getUser, addUser, updateUser, getUserById } from '../models/userModel.js';
import crypto from 'crypto';
import { auth } from '../firebase.js';


// Update to use the generateSalt method as required
const generateSalt = (length = 30) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const rnd = crypto.randomBytes(length);
    return Array.from(rnd).map(byte => chars[byte % chars.length]).join('');
};

const hashPassword = (password, salt) => {
    const hash = crypto.createHash("sha256");
    hash.update(password + salt); // Ensure this matches how the mobile app does it (password + salt)
    return hash.digest("hex");
};


export const updateUserHandler = async (req, res) => {
    const { studentId, contactNumber, emailAddress, firstName } = req.body;

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

    if (!studentId || !password) {
        return res.status(400).json({ message: "Student ID and password are required" });
    }

    try {
        // Fetch user from Firestore
        const user = await getUser(studentId);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Retrieve the stored hash and salt
        const { password: storedHash, salt } = user;

        // Hash the input password with the stored salt (this matches the mobile app behavior)
        const hashedInputPassword = hashPassword(password, salt);

        // Compare the hashes
        if (hashedInputPassword === storedHash) {
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid credentials." });
        }
    } catch (error) {
        console.error("Error in getUserHandler:", error);
        res.status(500).send(error.message);
    }
};


export const addUserHandler = async (req, res) => {
    const { firstName, lastName, emailAddress, contactNumber, password, studentId } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !emailAddress || !contactNumber || !password || !studentId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Create user with Firebase Admin SDK
        const userRecord = await auth.createUser({
            email: emailAddress,
            password: password,
            displayName: `${firstName} ${lastName}`
        });

        // Generate salt and hash password for Firestore
        const salt = generateSalt(30);
        const hashedPassword = hashPassword(password, salt);

        // Create the user object
        const newUser = {
            firstName,
            lastName,
            emailAddress,
            contactNumber,
            password: hashedPassword,
            salt,
            studentId,
            firebaseUid: userRecord.uid
        };

        const userId = await addUser(newUser);
        res.status(201).json({ 
            message: "User added successfully", 
            userId,
            firebaseUid: userRecord.uid 
        });
    } catch (error) {
        console.error("Error in addUserHandler:", error);
        
        // Handle specific Firebase Auth errors
        if (error.code === 'auth/email-already-exists') {
            return res.status(400).json({ message: "Email address is already in use" });
        } else if (error.code === 'auth/invalid-email') {
            return res.status(400).json({ message: "Invalid email address" });
        } else if (error.code === 'auth/operation-not-allowed') {
            return res.status(500).json({ message: "Email/password accounts are not enabled" });
        } else if (error.code === 'auth/invalid-password') {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        res.status(500).json({ message: error.message });
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
