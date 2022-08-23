import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Schedules{
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    scheduleState: string
    
    @Column()
    serviceStatus: string
}