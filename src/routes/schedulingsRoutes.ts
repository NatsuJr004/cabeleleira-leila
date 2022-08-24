import express from 'express';
const schedulingRoutes = express.Router();
import SchedulingController from '../controllers/schedulingController';

schedulingRoutes.post('/scheduling', SchedulingController.createScheduling);
schedulingRoutes.get('/scheduling', SchedulingController.readAllScheduling);

export default schedulingRoutes;