import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { verifyPassword } from '../helpers/auth-helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async SignUpUser(body: CreateUserDto) {
    const user = await this.userService.create(body);
    return user;
  }

  async LoginUser(data: LoginUserDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user || !(await verifyPassword(data.password, user.password))) {
      throw new HttpException(
        'invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { id: user._id, email: user.email };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      message: 'login successful',
      token,
      data: user.firstName + ' ' + user.lastName,
    };
  }
}
