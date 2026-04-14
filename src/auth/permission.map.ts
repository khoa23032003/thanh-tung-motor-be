export const ROLE_PERMISSIONS = {
  ADMIN: [
    'cart:view',
    'cart:add',
    'cart:update',
    'cart:remove',
    'product:create',
    'product:update',
    'product:delete',
  ],

  USER: ['cart:view', 'cart:add', 'cart:update', 'cart:remove'],

  GUEST: ['cart:view'],
};
