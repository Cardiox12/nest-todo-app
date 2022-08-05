import { User } from "../../users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum TaskStatusEnum {
    TODO    = "todo",
    DONE    = "done"
};

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    task_id: string;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    content: string;

    @Column({
        type: 'enum',
        enum: TaskStatusEnum,
        default: TaskStatusEnum.TODO
    })
    status: TaskStatusEnum;

    @CreateDateColumn()
    creation_date: Date;

    @UpdateDateColumn()
    update_date: Date;
}
