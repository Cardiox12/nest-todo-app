import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { TodoController } from './todo.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "tony",
      password: "1234",
      database: "todo",
      entities: [User, Task],
      synchronize: true
    }),
    UsersModule,
    TasksModule,
    AuthModule
  ],
  controllers: [TodoController]
})

export class TodoModule {
  constructor(private dataSource: DataSource) { }
}
