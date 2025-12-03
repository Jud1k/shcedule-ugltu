import { useEffect } from 'react';
import { useLessonsByGroup } from '../api/get-lessons';
import { LessonsListView } from './LessonListView';
import { useCalendar } from '@/context/CalendarProvider';

interface GroupLessonsListProps {
  groupId: string;
}

export const GroupLessonsList = ({ groupId }: GroupLessonsListProps) => {
  const { selectedDayWeek, setHasLessonsOnDays } = useCalendar();

  const lessonsQuery = useLessonsByGroup({
    groupId,
    queryConfig: { enabled: !!groupId },
  });
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

  const filtredLessons = lessons?.filter(
    (lesson) => lesson.day_of_week === selectedDayWeek,
  );

  return (
    <LessonsListView
      lessons={filtredLessons}
      isLoading={lessonsQuery.isLoading}
    />
  );
};
