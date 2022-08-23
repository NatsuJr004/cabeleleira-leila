import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/modelUser";

const Database = new DataSource({
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [User],
    synchronize: true,
    logging: false,
})