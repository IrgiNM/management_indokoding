export type UserType = {
  id?: number;
  username: string;
  password?: string;
  email: string;
  is_staff: boolean;
  role?: string;
};