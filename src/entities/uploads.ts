import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./posts";
import { Activities } from "./activities";

@Entity()
export class Uploads{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @PrimaryColumn()
    uploads_pk: number;

    @Column()
    relative_path: string;

    @Column()
    filename: string;

    @ManyToOne(()=>Posts, (posts_)=> Posts.Uploads)
    posts_: Posts;

    @ManyToOne(()=>Activities, (activities_)=> Activities.Uploads)
    activities_: Posts;
}