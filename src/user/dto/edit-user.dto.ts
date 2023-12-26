import { IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';

export class EditUser {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsNumber()
  @IsOptional()
  contactNo: number;
}
