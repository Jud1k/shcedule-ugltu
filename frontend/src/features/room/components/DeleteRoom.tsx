import { Button } from '@/components/generic/Button';
import { Delete } from '@/components/generic/Icons';
import { useDeleteRoom } from '../api/delete-room';

interface DeleteRoomProps {
  roomId: string;
}

export const DeleteRoom = ({ roomId }: DeleteRoomProps) => {
  const deleteRoomMutation = useDeleteRoom({});

  const handleDelete = () => {
    if (confirm('Удалить аудиторию?')) {
      deleteRoomMutation.mutate(roomId);
    }
  };
  return <Button icon={<Delete />} onClick={handleDelete}></Button>;
};
