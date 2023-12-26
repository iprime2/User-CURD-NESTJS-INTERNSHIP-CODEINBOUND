import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
