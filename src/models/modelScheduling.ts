import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './modelUser';

@Entity()
export class Scheduling{
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    title: string

    @Column()
    description: string
    
    @Column()
    serviceStatus: string

    @ManyToOne(() => User, (user) => user.schedulings, {
        onDelete: "CASCADE"
    })
    user: User
}