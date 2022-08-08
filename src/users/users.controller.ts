import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    this.usersService.create(createUserDTO);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.usersService.findOne(user_id);
  }

  @Patch(':user_id')
  update(@Param('user_id') user_id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.usersService.update(user_id, updateUserDTO);
  }

  @Delete(':user_id')
  remove(@Param('user_id') user_id: string) {
    return this.usersService.remove(user_id);
  }
}
