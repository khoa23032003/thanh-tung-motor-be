import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'khoa',
    description: 'Tên đăng nhập',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: '2303',
    description: 'Mật khẩu',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
