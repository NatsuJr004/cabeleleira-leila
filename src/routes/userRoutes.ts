import express from 'express';
const userRoutes = express.Router();
import UserController from '../controllers/userController';

userRoutes.post('/user', UserController.createUser);
userRoutes.get('/users', UserController.readAllUsers);
userRoutes.delete('/user', UserController.deleteUser);

export default userRoutes;