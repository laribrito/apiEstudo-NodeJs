import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./posts";
import { Activities } from "./activities";

@Entity()
export class Uploads{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    relative_path: string;

    @Column()
    filename: string;

    @ManyToOne(()=>Posts, (posts_)=> Posts.Uploads)
    posts_: Posts;

    @ManyToOne(()=>Activities, (activities_)=> Activities.Uploads)
    activities_: Posts;
}