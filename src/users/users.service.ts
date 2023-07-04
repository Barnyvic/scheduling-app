import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user-schema';
import { hashPassword } from '../helpers/auth-helper';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new HttpException(
        'a user with this email address already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await hashPassword(createUserDto.password);
    const newUser = new User();
    Object.assign(newUser, createUserDto);
    newUser.password = hash;

    const { password, ...rest } = await this.userRepository.create(newUser);

    return rest;
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }
}
