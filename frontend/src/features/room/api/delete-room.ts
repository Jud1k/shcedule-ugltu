import { useErrorHandler } from '@/hooks/useErrorHandler';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import RoomService from './service';
import { getRoomsQueryOptions } from './get-rooms';

type DeleteRoomOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof RoomService.deleteRoom>;
};

export const useDeleteRoom = ({
  successMessage,
  mutationConfig,
}: DeleteRoomOptions) => {
  const queryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getRoomsQueryOptions().queryKey,
      });
      handleSuccess(successMessage || 'Аудитория успешно удалена');
      onSuccess?.(...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...restConfig,
    mutationFn: RoomService.deleteRoom,
  });
};
