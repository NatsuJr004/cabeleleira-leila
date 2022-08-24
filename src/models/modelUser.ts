import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Scheduling } from './modelScheduling'

@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    isAdmin: boolean

    @OneToMany(() => Scheduling, (scheduling) => scheduling.user, {eager: true})
    schedulings: Scheduling[]
}