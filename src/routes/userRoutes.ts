import express from 'express';
const userRoutes = express.Router();
import UserController from '../controllers/userController';

userRoutes.post('/user', UserController.createUser);
userRoutes.get('/users', UserController.readAllUsers);
userRoutes.delete('/user', UserController.deleteUser);
userRoutes.put('/user', UserController.updateUser);
userRoutes.get('/user/:id', UserController.readUser);

export default userRoutes;