import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  Matches,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: 'userName', example: 'janedoe' })
  @IsNotEmpty({ message: 'userName is mandatory' })
  @IsString({ message: 'userName must be text' })
  userName: string;

  @ApiProperty({ description: 'Name', example: 'Jane Doe' })
  @IsNotEmpty({ message: 'Name is mandatory' })
  @IsString({ message: 'Name must be a chain of text' })
  name: string;

  @ApiProperty({ description: 'Email', example: 'janedoe@gmail.com' })
  @IsNotEmpty({ message: 'Email is mandatory' })
  @IsEmail({}, { message: 'Email format example@example.com' })
  email: string;

  @ApiProperty({ description: 'Password', example: 'passwordSegura123' })
  @IsNotEmpty({ message: 'Password is mandatory' })
  @IsString({ message: 'Password must be a chain of test' })
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  password: string;


}

export class LoginUserDto {
  @ApiProperty({ description: 'userName', example: 'janedoe' })
  @IsNotEmpty({ message: 'userName is mandatory' })
  userName: string;

  @ApiProperty({ description: 'Password', example: 'passwordSegura123' })
  @IsNotEmpty({ message: 'Password is mandatory' })
  password: string;
}
