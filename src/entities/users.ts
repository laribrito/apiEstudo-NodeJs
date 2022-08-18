import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, PrimaryColumn} from "typeorm"
import { Roles } from "./roles";
import { Activities } from "./activities";

@Entity()
export class Users {
    @PrimaryGeneratedColumn("uuid") 
    id: string

    @PrimaryColumn()
    user_pk: number;

    @Column({ length: 90 })
    name: string;

    @Column({length: 90})
    email: string;
    
    @Column()
    password: string;

    @ManyToOne(() => Roles, (role_) => Roles.User)
    role_: Roles

    @CreateDateColumn({update: false}) 
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at'}) 
    updated_at: Date;

    @ManyToMany(() => Activities)
    @JoinTable()
    activities: Activities[]
    

}