import { MutationConfig } from '@/lib/react-query';
import { z } from 'zod';
import SubjectService from './service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getSubjectsQueryOptions } from './get-subjects';

export const createSubjectFormSchema = z.object({
  name: z.string().min(3, 'Поле должно содержать минимум 3 символа'),
  semester: z
    .number()
    .gt(0, 'Семестр должен быть больше 0')
    .lt(16, 'Семестр должен быть меньше 16'),
  total_hours: z.number().gt(0, 'Кол-во часов должно быть больше 0'),
  is_optional: z.boolean(),
});

export type CreateSubjectForm = z.infer<typeof createSubjectFormSchema>;

type CreateSubjectOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof SubjectService.createSubject>;
};

export const useCreateSubject = ({
  successMessage,
  mutationConfig,
}: CreateSubjectOptions) => {
  const qeuryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      qeuryClient.invalidateQueries({
        queryKey: getSubjectsQueryOptions().queryKey,
      });
      handleSuccess(successMessage || 'Предмет успешно создан');
      onSuccess?.(...args);
    },
    onError: (erorr: unknown) => {
      handleApiError(erorr);
    },
    ...restConfig,
    mutationFn: SubjectService.createSubject,
  });
};
