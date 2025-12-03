import { MutationConfig } from '@/lib/react-query';
import z from 'zod';
import RoomService from './service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getRoomsQueryOptions } from './get-rooms';

export const createRoomFormSchema = z.object({
  name: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  floor: z.number().gt(0, 'Значение должно быть больше 0'),
  capacity: z.number().gt(0, 'Значение должно быть больше 0'),
  status: z.number(),
  building_id: z.number(),
});

export type CreateRoomForm = z.infer<typeof createRoomFormSchema>;

type CreateRoomOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof RoomService.createRoom>;
};

export const useCreateRoom = ({
  successMessage,
  mutationConfig,
}: CreateRoomOptions) => {
  const queryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getRoomsQueryOptions().queryKey,
      });
      handleSuccess(successMessage || 'Аудитория успешно создана');
      onSuccess?.(...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...restConfig,
    mutationFn: RoomService.createRoom,
  });
};
