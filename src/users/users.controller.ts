import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Get, UseGuards, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UserResponseDto } from './dto/user-response.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();

    return users.map((user) => ({
      id: user._id.toString(),
      userName: user.userName,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return {
      id: user._id,
      userName: user.name,
      email: user.email,
      
    }


}


}