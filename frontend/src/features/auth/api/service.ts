import { AxiosResponse } from 'axios';
import api from '@/api/axiosConfig';
import z from 'zod';
import { apiRoutes } from '@/api/apiRoutes';

export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  role: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const authSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: userSchema,
});

export type AuthResponse = z.infer<typeof authSchema>;

export default class AuthService {
  static async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AxiosResponse> {
    return api.post(apiRoutes.auth.register, { email, password });
  }

  static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      apiRoutes.auth.login,
      {
        username: email,
        password: password,
      },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return authSchema.parse(response.data);
  }

  static async logout(): Promise<void> {
    return api.post(apiRoutes.auth.logout);
  }

  static async check(): Promise<User> {
    const response = await api.get<User>(apiRoutes.auth.check);
    return userSchema.parse(response.data);
  }
}
