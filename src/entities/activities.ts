import { Column, Entity, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activities{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @PrimaryColumn()
    activities_pk: number;

    @Column()
    value: number;

    @Column()
    description: string;

    @Column()
    due_date: Date;
    
    @CreateDateColumn()
    created_at: Date;
}