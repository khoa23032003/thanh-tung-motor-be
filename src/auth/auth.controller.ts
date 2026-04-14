import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Đăng ký hệ thống',
  })
  @ApiResponse({
    status: 200,
    description: 'Login success',
  })
  register(@Body() dto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Đăng nhập hệ thống',
  })
  @ApiResponse({
    status: 200,
    description: 'Login success',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
