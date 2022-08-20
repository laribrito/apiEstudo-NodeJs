import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Roles{
    @PrimaryGeneratedColumn()
    role_id: number

    @Column()
    role_name: string

    
}