import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import SubjectService from './service';

export const getSubjectQueryOptions = (subjectId: string) => {
  return queryOptions({
    queryKey: ['subject', subjectId],
    queryFn: () => SubjectService.fetchSubject(subjectId),
  });
};

type useSubjectsOptions = {
  subjectId: string;
  queryConfig?: QueryConfig<typeof getSubjectQueryOptions>;
};

export const useSubject = ({ subjectId, queryConfig }: useSubjectsOptions) => {
  return useQuery({ ...getSubjectQueryOptions(subjectId), ...queryConfig });
};
