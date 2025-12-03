import { queryOptions, useQuery } from '@tanstack/react-query';
import TeacherService from './service';
import { QueryConfig } from '@/lib/react-query';

export const getTeachersQueryOptions = () => {
  return queryOptions({
    queryKey: ['teachers'],
    queryFn: () => TeacherService.fetchTeachers(),
  });
};

type useTeachersOptions = {
  queryConfig?: QueryConfig<typeof getTeachersQueryOptions>;
};

export const useTeachers = ({ queryConfig }: useTeachersOptions) => {
  return useQuery({ ...getTeachersQueryOptions(), ...queryConfig });
};
