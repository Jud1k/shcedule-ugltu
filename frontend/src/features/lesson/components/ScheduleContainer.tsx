import { useCalendar } from '@/context/CalendarProvider';
import { useEffect } from 'react';
import { ViewMode } from '@/types/view';
import { ScheduleType } from '../types/consts';
import { useLessons } from '../hooks/useLessons';
import Spinner from '@/components/generic/Spinner';
import { ScheduleViewList } from './ScheduleViewList';
import { ScheduleViewTable } from './ScheduleViewTable';

interface ScheduleContainerProps {
  entityId: string;
  type: ScheduleType;
  viewMode: ViewMode;
}
export const ScheduleContainer = ({
  entityId,
  type,
  viewMode,
}: ScheduleContainerProps) => {
  const { selectedDayWeek, setHasLessonsOnDays } = useCalendar();

  const lessonsQuery = useLessons(type, entityId);
  const lessons = lessonsQuery.data;

  useEffect(() => {
    if (lessons) {
      const daysWithLessons = [
        ...new Set(lessons.map((lesson) => lesson.day_of_week)),
      ];
      setHasLessonsOnDays(daysWithLessons);
    } else if (!lessonsQuery.isLoading) {
      setHasLessonsOnDays([]);
    }
  }, [lessons, setHasLessonsOnDays, lessonsQuery.isLoading]);

  if (lessonsQuery.isLoading) return <Spinner />;

  return viewMode === 'list' ? (
    <ScheduleViewList lessons={lessons} selectedDayWeek={selectedDayWeek} />
  ) : (
    <ScheduleViewTable lessons={lessons} />
  );
};
