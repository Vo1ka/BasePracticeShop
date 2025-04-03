// types/auth.ts
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Type guard для проверки роли
export const isUserRole = (role: string): role is UserRole => {
  return ['user', 'admin'].includes(role);
};