import { useCalendar } from '@/context/CalendarProvider';
import { useLessonsByRoom } from '../api/get-lessons';
import { LessonsListView } from './LessonListView';
import { useEffect } from 'react';

interface RoomLessonsListProps {
  roomId: string;
}
export const RoomLessonsList = ({ roomId }: RoomLessonsListProps) => {
  const { selectedDayWeek, setHasLessonsOnDays } = useCalendar();

  const lessonsQuery = useLessonsByRoom({
    roomId,
    queryConfig: { enabled: !!roomId },
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
