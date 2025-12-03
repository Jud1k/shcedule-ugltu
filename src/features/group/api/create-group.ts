import { useErrorHandler } from '@/hooks/useErrorHandler';
import GroupService from './service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import z from 'zod';
import { MutationConfig } from '@/lib/react-query';
import { getGroupsSummaryQueryOption } from './get-groups-summary';

export const createGroupFormSchema = z.object({
  name: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  course: z.number(),
  institute: z.string().min(3, 'Поле должно содержать минимум 5 символов'),
});

export type CreateGroupForm = z.infer<typeof createGroupFormSchema>;

type CreateGroupOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof GroupService.createGroup>;
};

export const useCreateGroup = ({
  successMessage,
  mutationConfig,
}: CreateGroupOptions) => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleApiError } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getGroupsSummaryQueryOption().queryKey,
      });
      handleSuccess(successMessage || 'Группа успешно создана');
      onSuccess?.(...args);
    },
    onError: (error: unknown) => {
      handleApiError(error);
    },
    ...restConfig,
    mutationFn: GroupService.createGroup,
  });
};
