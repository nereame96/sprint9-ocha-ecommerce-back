import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
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

  @IsNotEmpty({ message: 'Adress is mandatory' })
  @IsString({ message: 'Adress must be a chain of text' })
  adress: string;

  @Matches(/^\d{9,15}$/, { message: 'Phone must be 9-15 digits' })
  phone: string;
}
