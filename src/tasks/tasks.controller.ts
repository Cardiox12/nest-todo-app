import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('users')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(":user_id/tasks")
  create(@Body() createTaskDto: CreateTaskDto, @Param('user_id') user_id: string) {
    return this.tasksService.create(user_id, createTaskDto);
  }

  @Get(":user_id/tasks")
  findAll(@Param('user_id') user_id: string) {
    return this.tasksService.findAll(user_id);
  }

  @Get(':user_id/tasks/:task_id')
  findOne(@Param('user_id') user_id: string, @Param('task_id') task_id: string) {
    // Is this a security concern ? User can get a task he does not own ?
    // How to manage that ?
    // Modify route to be => `/users/:user_id/tasks/:task_id' and check
    // if @user_id own the task @task_id ?
    // Because we select the tasks owned by the user, if we select a task
    // that is own by another user, it will not appear in the selection.
    return this.tasksService.findOne(user_id, task_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
