import { queryOptions, useQuery } from '@tanstack/react-query';
import GroupService from './service';
import { QueryConfig } from '@/lib/react-query';

export const getGroupsQueryOptions = () => {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: () => GroupService.fetchGroups(),
  });
};

type UseGroupsOptions = {
  queryConfig?: QueryConfig<typeof getGroupsQueryOptions>;
};

export const useGroups = ({ queryConfig }: UseGroupsOptions) => {
  return useQuery({ ...getGroupsQueryOptions(), ...queryConfig });
};
