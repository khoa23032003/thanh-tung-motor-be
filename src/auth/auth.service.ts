import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ROLE_PERMISSIONS } from 'src/auth/permission.map';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    console.log('DTO:', dto);
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        passwordHash: hash,
        phone: dto.phone,
        email: dto.email,
      },
    });
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException();

    // 🔥 lấy permissions
    const roles = user.userRoles.map((ur) => ur.role.name);
    const permissions = roles.flatMap((role) => ROLE_PERMISSIONS[role] || []);

    const payload = {
      sub: user.id,
      name: user.username,
      email: user.email,
      permissions,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: { deletedFlg: 0 },
      include: {
        userRoles: {
          include: { role: true },
        },
        userPermissions: {
          include: { permission: true },
        },
      },
    });

    return users.map((user) => this.mapUser(user));
  }

  mapUser(user: any) {
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive,

      roles: user.userRoles.map((ur) => ur.role.name),

      permissions: user.userPermissions.map((up) => up.permission.code),
    };
  }
}
