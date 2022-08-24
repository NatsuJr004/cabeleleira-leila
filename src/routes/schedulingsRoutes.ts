import express from 'express';
const schedulingRoutes = express.Router();
import SchedulingController from '../controllers/schedulingController';

schedulingRoutes.post('/scheduling', SchedulingController.createScheduling);
schedulingRoutes.get('/scheduling', SchedulingController.readAllScheduling);
schedulingRoutes.delete('/scheduling', SchedulingController.deleteScheduling);
schedulingRoutes.put('/scheduling', SchedulingController.updateScheduling);

export default schedulingRoutes;