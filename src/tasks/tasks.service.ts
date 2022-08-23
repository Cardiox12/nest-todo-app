import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatusEnum } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(user_id: string, createTaskDto: CreateTaskDto) {
    const { content, status } = createTaskDto;
    const user = await User.findOne({
      where: { user_id }
    });

    let stat: TaskStatusEnum;

    if ( status == TaskStatusEnum.DONE )
      stat = TaskStatusEnum.DONE;
    else if ( status == TaskStatusEnum.TODO )
      stat = TaskStatusEnum.TODO;
    else
      throw new Error("Status not known!");

    const task: Task = Task.create({
      user,
      content,
      status: stat
    });
    await task.save();
    return 'This action adds a new task';
  }

  async findAll(user_id: string) {
    return await User
            .createQueryBuilder()
            .leftJoinAndSelect("User.tasks", "tasks")
            .where("User.user_id = :user_id", { user_id })
            .select("content")
            .addSelect("status")
            .addSelect("creation_date")
            .addSelect("update_date")
            .execute();
  }

  async findOne(user_id: string, task_id: string) {
    console.log(`Get task ${task_id} from user ${user_id}`);
    return await User
            .createQueryBuilder()
            .leftJoinAndSelect("User.tasks", "tasks")
            .where("User.user_id = :user_id", { user_id })
            .andWhere("Tasks.task_id = :task_id", { task_id })
            .execute();
  }

  async update(user_id: string, task_id: string, updateTaskDto: UpdateTaskDto) {
    const user = await this.usersRepository.findOne({
      where: { user_id }
    });

    const task = await this.tasksRepository.findOne({
      where: { task_id }
    });
    const { content, status } = updateTaskDto;

    if ( !task ){
      return {
        msg: "Task not found!"
      }
    }
    if ( content && content.length != 0 )
      task.content = content;
    if ( status )
      task.status = status;
    task.save();
    return {
      msg: "Task updated successfuly!"
    };
  }

  async remove(user_id: string, task_id: string) {
    const user = await this.usersRepository.findOne({
      where: { user_id }
    });
    

    // const task = await this.tasksRepository.findOne({
    //   where: { task_id }
    // });
    // await this.tasksRepository.remove(task);
  }
}
