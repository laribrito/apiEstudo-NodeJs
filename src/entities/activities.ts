import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm"
import { Users } from "./users";

@Entity()
export class Activities{
    @PrimaryGeneratedColumn()
    activite_id: number

    @Column()
    value: number

    @Column()
    description: string

    @Column()
    due_date: string;
    
    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Users)
    @JoinTable()
    user: Users[]
}