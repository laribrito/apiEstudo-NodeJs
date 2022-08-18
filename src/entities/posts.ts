import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users";

@Entity()
export class Posts{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @PrimaryColumn()
    posts_pk: number;

    @Column()
    description: string;

    @ManyToOne(()=>Users, (user_)=> Users.Posts)
    user_: Users
}