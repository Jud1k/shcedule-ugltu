import { MutationConfig } from '@/lib/react-query';
import z from 'zod';
import LessonService from './service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export const createLessonSchema = z.object({
  time_id: z.string().min(1, 'Выберите время'),
  day_of_week: z.string().min(1, 'Выберите день недели'),
  type: z.string().min(1, 'Выберите тип'),
  subject_id: z.string().min(1, 'Выберите предмет из списка'),
  teacher_id: z.string().min(1, 'Выберите преподавателя из списка'),
  room_id: z.string().min(1, 'Выберите аудиторию из списка'),
  group_id: z.string().min(1, 'Выберите группу из списка'),
});

export type CreateLessonForm = z.infer<typeof createLessonSchema>;

type createLessonOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof LessonService.createLesson>;
};

export const useCreateLesson = ({
  successMessage,
  mutationConfig,
}: createLessonOptions) => {
  const queryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      handleSuccess(successMessage || 'Пара успешно создана');
      onSuccess?.(...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...restConfig,
    mutationFn: LessonService.createLesson,
  });
};
