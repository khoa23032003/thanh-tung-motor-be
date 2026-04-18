export class PermissionRegistry {
  private static permissions = new Set<string>();

  static add(permission: string) {
    this.permissions.add(permission);
  }

  static getAll(): string[] {
    return Array.from(this.permissions);
  }
}
