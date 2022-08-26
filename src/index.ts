require('dotenv').config();
import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import userRoutes from './routes/userRoutes';
import schedulingRoutes from './routes/schedulingsRoutes';
import serviceRoutes from './routes/serviceRoutes';
import './database/configDB';
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(schedulingRoutes);
app.use(serviceRoutes)

app.listen((process.env.API_PORT ?? 3000), () => console.log(`server is running: http://localhost:${process.env.API_PORT ?? 3000}`));