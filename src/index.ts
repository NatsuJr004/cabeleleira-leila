require('dotenv').config();
import express from 'express';
import cors from 'cors';
import "reflect-metadata";
const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    console.log('new acess');
    res.json({message: 'Hello World!'})
})

app.listen((process.env.API_PORT ?? 3000), () => console.log(`server is running: http://localhost:${process.env.API_PORT ?? 3000}`));