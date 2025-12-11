import useAppSearchParams from '@/hooks/useAppSearchParams';
import { ScheduleType } from '../types/consts';
import { ScheduleContainer } from './ScheduleContainer';
import { ViewMode } from '@/types/view';

interface LessonRouterProps {
  viewMode: ViewMode;
}

export const LessonsRouter = ({ viewMode }: LessonRouterProps) => {
  const { getParam } = useAppSearchParams();

  const currentGroup = getParam(ScheduleType.GROUP);
  const currentTeacher = getParam(ScheduleType.TEACHER);
  const currentRoom = getParam(ScheduleType.ROOM);

  if (currentGroup) {
    return (
      <ScheduleContainer
        viewMode={viewMode}
        entityId={currentGroup}
        type={ScheduleType.GROUP}
      />
    );
  } else if (currentTeacher) {
    return (
      <ScheduleContainer
        viewMode={viewMode}
        entityId={currentTeacher}
        type={ScheduleType.TEACHER}
      />
    );
  } else if (currentRoom) {
    return (
      <ScheduleContainer
        viewMode={viewMode}
        entityId={currentRoom}
        type={ScheduleType.ROOM}
      />
    );
  } else {
    return null;
  }
};
