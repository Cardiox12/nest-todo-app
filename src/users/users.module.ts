import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { Task } from "../tasks/entities/task.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Task])],
    exports: [TypeOrmModule],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}