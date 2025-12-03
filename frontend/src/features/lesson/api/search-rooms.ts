import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import RoomService from '@/features/room/api/service';

export const searchRoomsQueryOptions = (searchTerm: string) => {
  return queryOptions({
    queryKey: ['searchRooms', searchTerm],
    queryFn: () => RoomService.searchRooms(searchTerm),
  });
};

type UseSearchRoomsOptions = {
  searchTerm: string;
  queryConfig?: QueryConfig<typeof searchRoomsQueryOptions>;
};

export const useSearchRooms = ({
  searchTerm,
  queryConfig,
}: UseSearchRoomsOptions) => {
  return useQuery({ ...searchRoomsQueryOptions(searchTerm), ...queryConfig });
};
