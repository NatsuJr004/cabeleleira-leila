import express from 'express';
const schedulingRoutes = express.Router();
import SchedulingController from '../controllers/schedulingController';
import { auth } from '../middleware/middlewareAuth';

schedulingRoutes.post('/scheduling', SchedulingController.createScheduling);
schedulingRoutes.get('/scheduling', SchedulingController.readAllScheduling);
schedulingRoutes.delete('/scheduling', auth, SchedulingController.deleteScheduling);
schedulingRoutes.put('/scheduling', auth, SchedulingController.updateScheduling);
schedulingRoutes.put('/scheduling/edit', auth, SchedulingController.editScheduling);
// editScheduling

export default schedulingRoutes;