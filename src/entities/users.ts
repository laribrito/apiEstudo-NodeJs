import { 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    Column,
    JoinColumn
} from "typeorm"
import { Roles } from "./roles";

@Entity()
export class Users {
    @PrimaryGeneratedColumn() 
    user_id: number

    @Column({ length: 90 })
    name: string;

    @Column({length: 90})
    email: string;
    
    @Column()
    password: string;

    @ManyToOne(() => Roles, (role_) => Roles.User)
    @JoinColumn({name: 'role_id'})
    fk_role_id: Roles

    @CreateDateColumn({update: false}) 
    created_at: Date;

    @UpdateDateColumn() 
    updated_at: Date;
}