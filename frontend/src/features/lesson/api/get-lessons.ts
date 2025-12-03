import { queryOptions, useQuery } from '@tanstack/react-query';
import LessonService, { LessonByQuery } from './service';
import { QueryConfig } from '@/lib/react-query';

export const getLessonByGroupQueryOptions = (groupId: string) => {
  return queryOptions({
    queryKey: ['lessons', 'group', groupId],
    queryFn: () => LessonService.fetchLessonsByQuery({ group: groupId }),
  });
};

type UseLessonByGroupOptions = {
  groupId: string;
  queryConfig?: QueryConfig<typeof getLessonByGroupQueryOptions>;
};

export const useLessonsByGroup = ({
  groupId,
  queryConfig,
}: UseLessonByGroupOptions) => {
  return useQuery({ ...getLessonByGroupQueryOptions(groupId), ...queryConfig });
};

export const getLessonByRoomQueryOptions = (roomId: string) => {
  return queryOptions({
    queryKey: ['lessons', 'room', roomId],
    queryFn: () => LessonService.fetchLessonsByQuery({ room: roomId }),
  });
};

type UseLessonByRoomOptions = {
  roomId: string;
  queryConfig?: QueryConfig<typeof getLessonByRoomQueryOptions>;
};

export const useLessonsByRoom = ({
  roomId,
  queryConfig,
}: UseLessonByRoomOptions) => {
  return useQuery({ ...getLessonByRoomQueryOptions(roomId), ...queryConfig });
};

export const getLessonByTeacherQueryOptions = (teacherId: string) => {
  return queryOptions({
    queryKey: ['lessons', 'teacher', teacherId],
    queryFn: () => LessonService.fetchLessonsByQuery({ teacher: teacherId }),
  });
};

type UseLessonByTeacherOptions = {
  teacherId: string;
  queryConfig?: QueryConfig<typeof getLessonByTeacherQueryOptions>;
};

export const useLessonsByTeacher = ({
  teacherId,
  queryConfig,
}: UseLessonByTeacherOptions) => {
  return useQuery({
    ...getLessonByTeacherQueryOptions(teacherId),
    ...queryConfig,
  });
};
