import { useMutation, useQueryClient } from '@tanstack/react-query';
import GroupService from './service';
import { MutationConfig } from '@/lib/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getGroupsSummaryQueryOption } from './get-groups-summary';

type DeleteGroupOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof GroupService.deleteGroup>;
};

export const useDeleteGroup = ({
  successMessage,
  mutationConfig,
}: DeleteGroupOptions) => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleApiError } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getGroupsSummaryQueryOption().queryKey,
      });
      handleSuccess(successMessage || 'Группа успешно удалена');
      onSuccess?.(...args);
    },
    onError: (error) => {
      handleApiError(error);
    },
    ...restConfig,
    mutationFn: (groupId: string) => GroupService.deleteGroup(groupId),
  });
};
