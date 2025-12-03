import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import TeacherService from '@/features/teacher/api/service';

export const searchTeachersQueryOptions = (searchTerm: string) => {
  return queryOptions({
    queryKey: ['searchTeachers', searchTerm],
    queryFn: () => TeacherService.searchTeachers(searchTerm),
  });
};

type UseSearchTeachersOptions = {
  searchTerm: string;
  queryConfig?: QueryConfig<typeof searchTeachersQueryOptions>;
};

export const useSearchTeachers = ({
  searchTerm,
  queryConfig,
}: UseSearchTeachersOptions) => {
  return useQuery({
    ...searchTeachersQueryOptions(searchTerm),
    ...queryConfig,
  });
};
