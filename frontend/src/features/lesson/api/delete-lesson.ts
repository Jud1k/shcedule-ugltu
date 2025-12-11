import { MutationConfig } from '@/lib/react-query';
import LessonService from './service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';

type DeleteLessonOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof LessonService.deleteLesson>;
};

export const useDeleteLesson = ({
  successMessage,
  mutationConfig,
}: DeleteLessonOptions) => {
  const queryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      handleSuccess(successMessage || 'Пара успешно удалена.');
      onSuccess?.(...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...restConfig,
    mutationFn: (lessonId) => LessonService.deleteLesson(lessonId),
  });
};
