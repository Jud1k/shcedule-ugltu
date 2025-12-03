import { MutationConfig } from '@/lib/react-query';
import z from 'zod';
import RoomService from './service';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getRoomQueryOptions } from './get-room';
import { getRoomsQueryOptions } from './get-rooms';

export const updateRoomFormSchema = z.object({
  name: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  floor: z.number().gt(0, 'Значение должно быть больше 0'),
  capacity: z.number().gt(0, 'Значение должно быть больше 0'),
  status: z.number(),
  building_id: z.number(),
});

export type UpdateRoomForm = z.infer<typeof updateRoomFormSchema>;

type UpdateRoomOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof RoomService.updateRoom>;
};

export const useUpdateRoom = ({
  successMessage,
  mutationConfig,
}: UpdateRoomOptions) => {
  const queryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getRoomQueryOptions(data.id).queryKey, data);
      queryClient.invalidateQueries({
        queryKey: getRoomsQueryOptions().queryKey,
      });
      handleSuccess(successMessage || 'Аудитория успешно изменена');
      onSuccess?.(data, ...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...restConfig,
    mutationFn: RoomService.updateRoom,
  });
};
