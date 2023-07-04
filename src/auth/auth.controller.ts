import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUpUser(@Body() signUpDto: CreateUserDto) {
    return this.authService.SignUpUser(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.LoginUser(loginDto);
  }
}
