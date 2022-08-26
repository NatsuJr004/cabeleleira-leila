import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/modelUser";
import { Scheduling } from "../models/modelScheduling";
import { Service } from '../models/modelService';

const Database = new DataSource({
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [User, Scheduling, Service],
    synchronize: true,
    logging: false,
})

export default Database.initialize();