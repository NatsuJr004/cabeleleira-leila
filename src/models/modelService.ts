import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Service{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    description: string
    
    @Column()
    location: string
    
    @Column()
    price: string
}