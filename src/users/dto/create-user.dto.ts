import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'userName is mandatory' })
  @IsString({ message: 'userName must be text' })
  userName: string;

  @IsNotEmpty({ message: 'userName is mandatory' })
  @IsString({ message: 'userName must be text' })
  name: string;

  @IsNotEmpty({ message: 'Email is mandatory' })
  @IsEmail({}, { message: 'Email format example@example.com' })
  email: string;

  @IsNotEmpty({ message: 'Password is mandatory' })
  @MinLength(6)
  password: string;

  
}
