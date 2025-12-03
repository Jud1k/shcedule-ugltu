import AuthService, { User } from '@/features/auth/api/service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from './useErrorHandler';
import z from 'zod';
import { useNavigate } from 'react-router';

export const loginInputSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const isLoggedIn = () => {
  return localStorage.getItem('access_token') !== null;
};

const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleSuccess, handleApiError } = useErrorHandler();

  const { data: user, isLoading } = useQuery<User | null, Error>({
    queryKey: ['currentUser'],
    queryFn: AuthService.check,
    enabled: isLoggedIn(),
  });

  const registerMutation = useMutation({
    mutationFn: AuthService.register,
    onError: (error: unknown) => {
      handleApiError(error);
    },
  });

  const login = async (data: LoginInput) => {
    const response = await AuthService.login(data);
    localStorage.setItem('access_token', response.access_token);
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: unknown) => handleApiError(error),
  });

  const logout = async () => {
    localStorage.removeItem('access_token');
    await AuthService.logout();
    queryClient.invalidateQueries({ queryKey: ['currentUser'] });
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      handleSuccess('Вы успешно вышли из системы.');
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
  });

  return {
    registerMutation,
    loginMutation,
    logoutMutation,
    user,
    isLoading,
  };
};

export default useAuth;
