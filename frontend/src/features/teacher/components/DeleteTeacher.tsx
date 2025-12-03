import { Delete } from '@/components/generic/Icons';
import { useDeleteTeacher } from '../api/delete-teacher';
import { Button } from '@/components/generic/Button';

interface DeleteTeacherProps {
  teacherId: string;
}

export const DeleteTeacher = ({ teacherId }: DeleteTeacherProps) => {
  const deleteTeacherMutation = useDeleteTeacher({});

  const handleDelete = () => {
    if (confirm('Удалить аудиторию?')) {
      deleteTeacherMutation.mutate(teacherId);
    }
  };
  return <Button icon={<Delete />} onClick={handleDelete}></Button>;
};
