import { MutationConfig } from '@/lib/react-query';
import SubjectService from './service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getSubjectsQueryOptions } from './get-subjects';

type DeleteSubjectOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof SubjectService.deleteSubject>;
};
export const useDeleteSubject = ({
  successMessage,
  mutationConfig,
}: DeleteSubjectOptions) => {
  const queryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getSubjectsQueryOptions().queryKey,
      });
      handleSuccess(successMessage || 'Предмет успешно удален');
      onSuccess?.(...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...restConfig,
    mutationFn: SubjectService.deleteSubject,
  });
};
