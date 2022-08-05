import { Task } from "../../tasks/entities/task.entity";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: string;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @OneToMany(
        () => Task, 
        (task) => task.user, 
        { cascade: true }
    )
    tasks: Task[];
}