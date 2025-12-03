import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import GroupService from '@/features/group/api/service';

export const searchGroupsQueryOptions = (searchTerm: string) => {
  return queryOptions({
    queryKey: ['searchGroups', searchTerm],
    queryFn: () => GroupService.searchGroups(searchTerm),
  });
};

type UseSearchGroupsOptions = {
  searchTerm: string;
  queryConfig?: QueryConfig<typeof searchGroupsQueryOptions>;
};

export const useSearchGroups = ({
  searchTerm,
  queryConfig,
}: UseSearchGroupsOptions) => {
  return useQuery({
    ...searchGroupsQueryOptions(searchTerm),
    ...queryConfig,
  });
};
