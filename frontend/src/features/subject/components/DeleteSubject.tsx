import { Button } from '@/components/generic/Button';
import { Delete } from '@/components/generic/Icons';
import { useDeleteSubject } from '../api/delete-subject';

interface DeleteSubjectProps {
  subjectId: string;
}

export const DeleteSubject = ({ subjectId }: DeleteSubjectProps) => {
  const deleteRoomMutation = useDeleteSubject({});

  const handleDelete = () => {
    if (confirm('Удалить аудиторию?')) {
      deleteRoomMutation.mutate(subjectId);
    }
  };
  return <Button icon={<Delete />} onClick={handleDelete}></Button>;
};
