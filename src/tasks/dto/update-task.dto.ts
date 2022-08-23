import { PartialType } from '@nestjs/mapped-types';
import { TaskStatusEnum } from '../entities/task.entity';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto {
    content: string;
    status: TaskStatusEnum;
}
