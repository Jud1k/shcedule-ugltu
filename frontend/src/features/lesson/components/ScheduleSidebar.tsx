import { Button } from '@/components/generic/Button';
import useAppSearchParams from '@/hooks/useAppSearchParams';
import { Calendar } from './Calendar';
import { ScheduleType } from '../types/consts';
import { useEffect, useState } from 'react';
import { SearchRoom } from './SearchRoom';
import { SearchGroup } from './SearchGroup';
import { SearchTeacher } from './SearchTeacher';
import { useQueryClient } from '@tanstack/react-query';
import { useCalendar } from '@/context/CalendarProvider';

export const ScheduleSidebar = () => {
  const queryClient = useQueryClient();
  const { updateParams, getParam } = useAppSearchParams();
  const [activeType, setActiveType] = useState<ScheduleType>(
    ScheduleType.GROUP,
  );
  const { resetToToday, setHasLessonsOnDays } = useCalendar();
  const currentGroup = getParam(ScheduleType.GROUP);
  const currentTeacher = getParam(ScheduleType.TEACHER);
  const currentRoom = getParam(ScheduleType.ROOM);

  useEffect(() => {
    if (currentGroup) {
      setActiveType(ScheduleType.GROUP);
    } else if (currentTeacher) {
      setActiveType(ScheduleType.TEACHER);
    } else if (currentRoom) {
      setActiveType(ScheduleType.ROOM);
    }
  }, [currentGroup, currentTeacher, currentRoom]);

  const handleTypeChange = (newType: ScheduleType) => {
    resetToToday();
    setHasLessonsOnDays([]);
    queryClient.invalidateQueries({ queryKey: ['lessons'] });
    setActiveType(newType);
    updateParams({
      group: null,
      teacher: null,
      room: null,
      month: null,
    });
  };

  const renderSelector = () => {
    return (
      <div>
        {activeType === ScheduleType.GROUP && <SearchGroup />}
        {activeType === ScheduleType.TEACHER && <SearchTeacher />}
        {activeType === ScheduleType.ROOM && <SearchRoom />}
      </div>
    );
  };

  const getButtonVariant = (buttonType: ScheduleType) => {
    return activeType === buttonType ? 'outline' : 'default';
  };

  return (
    <div className="w-full">
      {renderSelector()}
      <Calendar />
      <div className="flex flex-col gap-3 w-full mt-4">
        <Button
          onClick={() => handleTypeChange(ScheduleType.GROUP)}
          className="w-full"
          variant={getButtonVariant(ScheduleType.GROUP)}
        >
          Расписание занятий студентов
        </Button>
        <Button
          onClick={() => handleTypeChange(ScheduleType.TEACHER)}
          className="w-full"
          variant={getButtonVariant(ScheduleType.TEACHER)}
        >
          Расписание занятий преподавателей
        </Button>
        <Button
          onClick={() => handleTypeChange(ScheduleType.ROOM)}
          className="w-full"
          variant={getButtonVariant(ScheduleType.ROOM)}
        >
          Расписание занятий по аудиториям
        </Button>
      </div>
    </div>
  );
};
