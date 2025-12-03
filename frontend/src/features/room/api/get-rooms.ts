import { queryOptions, useQuery } from '@tanstack/react-query';
import RoomService from './service';
import { QueryConfig } from '@/lib/react-query';

export const getRoomsQueryOptions = () => {
  return queryOptions({
    queryKey: ['rooms'],
    queryFn: () => RoomService.fetchRooms(),
  });
};

type useRoomsOptions = {
  queryConfig?: QueryConfig<typeof getRoomsQueryOptions>;
};

export const useRooms = ({ queryConfig }: useRoomsOptions) => {
  return useQuery({ ...getRoomsQueryOptions(), ...queryConfig });
};
