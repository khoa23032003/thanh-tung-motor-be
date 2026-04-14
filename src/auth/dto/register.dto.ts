import { IsString, MinLength, IsOptional, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
