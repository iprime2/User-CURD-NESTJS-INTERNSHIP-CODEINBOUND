import { IsString, IsNotEmpty } from 'class-validator';

export class ChangePassword {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
