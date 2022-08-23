require('dotenv').config();
import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import userRoutes from './routes/userRoutes';
import './database/configDB';
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes)

app.listen((process.env.API_PORT ?? 3000), () => console.log(`server is running: http://localhost:${process.env.API_PORT ?? 3000}`));