import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Roles{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @PrimaryColumn()
    roles_pk: number

    @Column()
    role_name: string

    
}