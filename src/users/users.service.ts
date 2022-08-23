import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>    
    ) {}

    async create(createUserDTO: CreateUserDTO) {
        console.log(createUserDTO);
        const {
            username,
            password
        } = createUserDTO;
        const user = User.create({
            username,
            password
        });

        console.log(`Create user ${createUserDTO}`);
        await user.save();
    }

    async update(user_id: string, updateUserDTO: UpdateUserDTO) {
        const user = await this.usersRepository.findOne({ 
            where: { user_id } 
        });

        if ( !user ){
            return {
                msg: "User not found!"
            }
        }
        user.password = updateUserDTO.password;
        await user.save();
        return {
            msg: "password changed successfuly!"
        };
    }

    async findAll() : Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(user_id: string) : Promise<User> {
        return await this.usersRepository.findOneBy({ user_id });
    }

    async findOneByUsername(username: string) : Promise<User> {
        return await this.usersRepository.findOneBy({ username });
    }

    async remove(user_id: string) : Promise<void> {
        await this.usersRepository.delete(user_id);
    }
}