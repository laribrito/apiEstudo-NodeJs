import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users";

@Entity()
export class Tokens{
    @PrimaryGeneratedColumn() 
    tokens_id: number

    @Column()
    token: string

    @ManyToOne(()=>Users)
    @JoinColumn({name: 'user_id'})
    user_id: Users
}