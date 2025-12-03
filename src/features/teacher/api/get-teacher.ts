import { queryOptions, useQuery } from '@tanstack/react-query';
import TeacherService from './service';
import { QueryConfig } from '@/lib/react-query';

export const getTeacherQueryOptions = (teacherId: string) => {
  return queryOptions({
    queryKey: ['teachers', teacherId],
    queryFn: () => TeacherService.fetchTeacher(teacherId),
  });
};

type useTeacherOptions = {
  teacherId: string;
  queryConfig?: QueryConfig<typeof getTeacherQueryOptions>;
};

export const useTeacher = ({ teacherId, queryConfig }: useTeacherOptions) => {
  return useQuery({ ...getTeacherQueryOptions(teacherId), ...queryConfig });
};
