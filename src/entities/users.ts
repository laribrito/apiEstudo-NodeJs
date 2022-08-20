import { 
    Entity, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    Column
} from "typeorm"
import { Roles } from "./roles";
import { Activities } from "./activities";

@Entity()
export class Users {
    @PrimaryGeneratedColumn() 
    id: number

    @Column({ length: 90 })
    name: string;

    @Column({length: 90})
    email: string;
    
    @Column()
    password: string;

    @CreateDateColumn({update: false}) 
    created_at: Date;

    @UpdateDateColumn() 
    updated_at: Date;

    @ManyToOne(() => Roles, (role_) => Roles.User)
    role_: Roles

    @ManyToMany(() => Activities)
    @JoinTable()
    activities: Activities[]
    

}