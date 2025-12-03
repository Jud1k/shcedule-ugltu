import { MutationConfig } from '@/lib/react-query';
import z from 'zod';
import TeacherService from './service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getTeachersQueryOptions } from './get-teachers';
import { nullableString } from '@/lib/zod-types';

export const createTeacherFormSchema = z.object({
  first_name: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  middle_name: nullableString(
    z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  ),
  last_name: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  email: nullableString(
    z.email().min(5, 'Поле должно содержать минимум 5 символов'),
  ),
  phone: nullableString(
    z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  ),
  department: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  title: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
});

export type CreateTeacherForm = z.infer<typeof createTeacherFormSchema>;

type CreateTeacherOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof TeacherService.createTeacher>;
};

export const useCreateTeacher = ({
  successMessage,
  mutationConfig,
}: CreateTeacherOptions) => {
  const queryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...resConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getTeachersQueryOptions().queryKey,
      });
      handleSuccess(successMessage || 'Преподаватель успешно создан');
      onSuccess?.(...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...resConfig,
    mutationFn: TeacherService.createTeacher,
  });
};
