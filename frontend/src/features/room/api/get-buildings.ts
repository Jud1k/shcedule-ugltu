import { queryOptions, useQuery } from '@tanstack/react-query';
import RoomService from './service';
import { QueryConfig } from '@/lib/react-query';

export const getBuildingsQueryOptions = () => {
  return queryOptions({
    queryKey: ['buildings'],
    queryFn: () => RoomService.fetchBuildings(),
  });
};

type useBuildingsOptions = {
  queryConfig?: QueryConfig<typeof getBuildingsQueryOptions>;
};

export const useBuildings = ({ queryConfig }: useBuildingsOptions) => {
  return useQuery({ ...getBuildingsQueryOptions(), ...queryConfig });
};
