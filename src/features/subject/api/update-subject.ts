import { MutationConfig } from '@/lib/react-query';
import z from 'zod';
import SubjectService from './service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getSubjectsQueryOptions } from './get-subjects';

export const updateSubjectFormSchema = z.object({
  name: z.string(),
  semester: z.number(),
  total_hours: z.number(),
  is_optional: z.boolean(),
});

export type UpdateSubjectForm = z.infer<typeof updateSubjectFormSchema>;

type UpdateSubjectOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof SubjectService.updateSubject>;
};

export const useUpdateSubject = ({
  successMessage,
  mutationConfig,
}: UpdateSubjectOptions) => {
  const queryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.refetchQueries({
        queryKey: getSubjectsQueryOptions().queryKey,
      });
      handleSuccess(successMessage || 'Предмет успешно обновлен');
      onSuccess?.(...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...restConfig,
    mutationFn: SubjectService.updateSubject,
  });
};
