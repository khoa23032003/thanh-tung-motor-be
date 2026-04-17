import { SetMetadata } from '@nestjs/common';
import { PermissionRegistry } from '../registry/permission.registry';

export const PERMISSION_KEY = 'permissions';

export const Permissions = (...permissions: string[]) => {
  permissions.forEach((p) => PermissionRegistry.add(p));

  return SetMetadata(PERMISSION_KEY, permissions);
};
