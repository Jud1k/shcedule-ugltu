import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import SubjectService from './service';

export const getSubjectsQueryOptions = () => {
  return queryOptions({
    queryKey: ['subjects'],
    queryFn: () => SubjectService.fetchSubjects(),
  });
};

type useSubjectsOptions = {
  queryConfig?: QueryConfig<typeof getSubjectsQueryOptions>;
};

export const useSubjects = ({ queryConfig }: useSubjectsOptions) => {
  return useQuery({ ...getSubjectsQueryOptions(), ...queryConfig });
};
