export const ROLES = {
  USER: 'user',
  TEACHER: 'teacher',
  ADMIN: 'admin',
} as const;

export type Role = keyof typeof ROLES;
export type RoleName = (typeof ROLES)[Role];
