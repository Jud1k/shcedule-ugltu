import { useErrorHandler } from '@/hooks/useErrorHandler';
import { MutationConfig } from '@/lib/react-query';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import z from 'zod';
import { getTeachersQueryOptions } from './get-teachers';
import TeacherService from './service';
import { nullableString } from '@/lib/zod-types';

export const updateTeacherFormSchema = z.object({
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

export type UpdateTeacherForm = z.infer<typeof updateTeacherFormSchema>;

type UpdateTeacherOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof TeacherService.updateTeacher>;
};

export const useUpdateTeacher = ({
  successMessage,
  mutationConfig,
}: UpdateTeacherOptions) => {
  const queryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...resConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.refetchQueries({
        queryKey: getTeachersQueryOptions().queryKey,
      });
      handleSuccess(successMessage || 'Преподаватель успешно изменен');
      onSuccess?.(...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...resConfig,
    mutationFn: TeacherService.updateTeacher,
  });
};
