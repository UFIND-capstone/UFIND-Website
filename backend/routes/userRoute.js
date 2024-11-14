import express from 'express';
import { getUserHandler, addUserHandler } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', getUserHandler);
router.post('/register', addUserHandler);

export default router;
