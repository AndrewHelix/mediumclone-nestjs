import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { ExpressRequest } from 'types/expressRequestInterface';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserResponse } from './types/userResponse.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginUsrDto: LoginUserDto): Promise<UserResponse> {
    const user = await this.userService.login(loginUsrDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(@Req() request: ExpressRequest): Promise<UserResponse> {
    return this.userService.buildUserResponse(request.user);
  }
}
