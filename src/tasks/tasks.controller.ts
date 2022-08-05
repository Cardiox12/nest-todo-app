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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
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
