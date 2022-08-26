import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./users"

@Entity()
export class Posts{
    @PrimaryGeneratedColumn()
    post_id: number

    @Column()
    description: string

    @ManyToOne(()=>Users, (user_)=> Users.Posts)
    @JoinColumn({name: "user_id"})
    user_id: Users
}