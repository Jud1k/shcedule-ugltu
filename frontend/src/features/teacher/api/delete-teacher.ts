import { useErrorHandler } from '@/hooks/useErrorHandler';
import { MutationConfig } from '@/lib/react-query';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getTeachersQueryOptions } from './get-teachers';
import TeacherService from './service';

type DeleteTeacherOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof TeacherService.deleteTeacher>;
};

export const useDeleteTeacher = ({
  successMessage,
  mutationConfig,
}: DeleteTeacherOptions) => {
  const queryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...resConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getTeachersQueryOptions().queryKey,
      });
      handleSuccess(successMessage || 'Преподаватель успешно удален');
      onSuccess?.(...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...resConfig,
    mutationFn: TeacherService.deleteTeacher,
  });
};
