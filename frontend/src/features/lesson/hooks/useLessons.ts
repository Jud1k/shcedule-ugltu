import {
  useLessonsByGroup,
  useLessonsByRoom,
  useLessonsByTeacher,
} from '../api/get-lessons';
import { ScheduleType } from '../types/consts';

export const useLessons = (type: ScheduleType, entityId: string) => {
  const hooksMap = {
    [ScheduleType.GROUP]: () => useLessonsByGroup({ groupId: entityId }),
    [ScheduleType.ROOM]: () => useLessonsByRoom({ roomId: entityId }),
    [ScheduleType.TEACHER]: () => useLessonsByTeacher({ teacherId: entityId }),
  };

  const useHook = hooksMap[type];
  if (!useHook) {
    throw new Error(`Unknown schedule type: ${type}`);
  }

  return useHook();
};
