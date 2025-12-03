import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import z from 'zod';
import GroupService from './service';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getGroupQueryOptions } from './get-group';
import { getGroupsSummaryQueryOption } from './get-groups-summary';

export const updateGroupFormSchema = z.object({
  name: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  course: z.number(),
  institute: z.string().min(3, 'Поле должно содержать минимум 5 символов'),
});

export type UpdateGroupForm = z.infer<typeof updateGroupFormSchema>;

type UpdateGroupOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof GroupService.updateGroup>;
};

export const useUpdateGroup = ({
  mutationConfig,
  successMessage,
}: UpdateGroupOptions) => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleApiError } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getGroupQueryOptions(data.id).queryKey, data);
      queryClient.invalidateQueries({
        queryKey: getGroupsSummaryQueryOption().queryKey,
      });
      handleSuccess(successMessage || 'Группа успешно обновлена');
      onSuccess?.(data, ...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...restConfig,
    mutationFn: GroupService.updateGroup,
  });
};
