import { Button } from '@/components/generic/Button';
import { useDeleteLesson } from '../api/delete-lesson';

interface DeleteLessonProps {
  lessonId: string;
  onSuccess: () => void;
}

export const DeleteLesson = ({ lessonId, onSuccess }: DeleteLessonProps) => {
  const deleteLessonMutation = useDeleteLesson({
    mutationConfig: {
      onSuccess: onSuccess,
    },
  });

  const handleDelete = () => {
    if (confirm('Удалить пару?')) {
      deleteLessonMutation.mutate(lessonId);
    }
  };

  return (
    <Button variant="error" className="w-full" onClick={handleDelete}>
      Удалить пару
    </Button>
  );
};
