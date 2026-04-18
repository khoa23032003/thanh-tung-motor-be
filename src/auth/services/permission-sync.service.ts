import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionRegistry } from '../registry/permission.registry';

@Injectable()
export class PermissionSyncService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const permissions = PermissionRegistry.getAll();

    for (const code of permissions) {
      await this.prisma.permission.upsert({
        where: { code },
        update: {},
        create: {
          code,
          description: code,
        },
      });
    }

    console.log('Permissions synced:', permissions);
  }
}
