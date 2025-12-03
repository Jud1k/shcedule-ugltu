import { Delete } from '@/components/generic/Icons';
import { useDeleteGroup } from '../api/delete-group';
import { Button } from '@/components/generic/Button';

interface DeleteGroupProps {
  groupId: number;
}

export const DeleteGroup = ({ groupId }: DeleteGroupProps) => {
  const deleteGroupMutation = useDeleteGroup({});

  const handleDelete = () => {
    if (confirm('Удалить группу?')) {
      deleteGroupMutation.mutate(groupId);
    }
  };

  return <Button icon={<Delete />} onClick={handleDelete}></Button>;
};
