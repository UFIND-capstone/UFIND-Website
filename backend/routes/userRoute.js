import express from 'express';
import { getUserHandler, addUserHandler, updateUserHandler, getUserByIdHandler, getAllUsersHandler, updateUserStatusHandler } from '../controllers/userController.js';

    const router = express.Router();

    router.post('/user', getUserHandler);
    router.post('/register', addUserHandler);
    router.put('/user/edit', updateUserHandler);
    router.get('/user/:studentId', getUserByIdHandler);
    router.get('/user/get/all', getAllUsersHandler );
    router.put('/user/status/update-status', updateUserStatusHandler);


export default router;
