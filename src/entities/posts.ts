import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./users"

@Entity()
export class Posts{
    @PrimaryGeneratedColumn()
    post_id: number

    @Column()
    description: string

    @ManyToOne(()=>Users, (user_)=> Users.Posts)
    user_: Users
}