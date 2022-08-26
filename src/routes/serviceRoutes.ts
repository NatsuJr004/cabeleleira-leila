import express from 'express';
const serviceRoutes = express.Router();
import ServiceController from '../controllers/serviceController';
import { auth } from '../middleware/middlewareAuth';

serviceRoutes.post('/service', ServiceController.createService);
serviceRoutes.get('/service', ServiceController.readAllService);
serviceRoutes.get('/service/:id', ServiceController.readService);
serviceRoutes.delete('/service', auth, ServiceController.deleteService);
serviceRoutes.put('/service/edit', auth, ServiceController.editService);
// serviceRoutes.get('/service/historic', auth, ServiceController.historyService);

export default serviceRoutes;