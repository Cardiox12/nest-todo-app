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
    private tasksRepository: Repository<Task>
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

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
