import { queryOptions, useQuery } from '@tanstack/react-query';
import GroupService from './service';
import { QueryConfig } from '@/lib/react-query';

export const getGroupsSummaryQueryOption = () => {
  return queryOptions({
    queryKey: ['groupsSummary'],
    queryFn: () => GroupService.fetchGroupSummary(),
  });
};

type GetGroupsSummaryOptions = {
  queryConfig?: QueryConfig<typeof getGroupsSummaryQueryOption>;
};

export const useGroupsSummary = ({ queryConfig }: GetGroupsSummaryOptions) => {
  return useQuery({
    ...getGroupsSummaryQueryOption(),
    ...queryConfig,
  });
};
