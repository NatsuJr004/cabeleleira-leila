import express from 'express';
const userRoutes = express.Router();
import UserController from '../controllers/userController';
import { auth } from '../middleware/middlewareAuth';

userRoutes.post('/user', UserController.createUser);
userRoutes.get('/users', UserController.readAllUsers);
userRoutes.delete('/user', auth, UserController.deleteUser);
userRoutes.put('/user', auth, UserController.updateUser);
userRoutes.put('/user/edit', auth, UserController.editDataUser);
userRoutes.get('/user/:id', UserController.readUser);
userRoutes.post('/login', UserController.loginUser);

export default userRoutes;