import useAppSearchParams from '@/hooks/useAppSearchParams';
import { ScheduleType } from '../types/consts';
import { GroupLessonsList } from './GroupLessonsList';
import { TeacherLessonsList } from './TeacherLessonsList';
import { RoomLessonsList } from './RoomLessonsList';

export const LessonsList = () => {
  const { getParam } = useAppSearchParams();

  const currentGroup = getParam(ScheduleType.GROUP);
  const currentTeacher = getParam(ScheduleType.TEACHER);
  const currentRoom = getParam(ScheduleType.ROOM);

  if (currentGroup) {
    return <GroupLessonsList groupId={currentGroup} />;
  } else if (currentTeacher) {
    return <TeacherLessonsList teacherId={currentTeacher} />;
  } else if (currentRoom) {
    return <RoomLessonsList roomId={currentRoom} />;
  } else {
    return null;
  }
};
