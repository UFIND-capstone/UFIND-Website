import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        setUser(userData); // Store all user data
        localStorage.setItem("user", JSON.stringify(userData));
      };
      

    const register = async (userData) => {
        try {
            const response = await axios.post('https://mel-backend.jwisnetwork.com/api/register', userData);
            return response.data;
        } catch (error) {
            console.error("Error registering:", error.message);
            throw error; // Rethrow error to handle it in the Register component
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
