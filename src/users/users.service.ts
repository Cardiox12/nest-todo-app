import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
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

    findAll() : Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(user_id: string) : Promise<User> {
        return this.usersRepository.findOneBy({ user_id });
    }

    async remove(user_id: string) : Promise<void> {
        await this.usersRepository.delete(user_id);
    }
}