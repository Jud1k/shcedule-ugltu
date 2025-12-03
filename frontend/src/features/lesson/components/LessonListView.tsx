import { LessonCard } from './LessonCard';
import { TIME_SLOTS } from '../types/consts';
import Badge from '@/components/generic/Badge';
import { LessonByQuery } from '../api/service';
import Spinner from '@/components/generic/Spinner';

interface LessonsListViewProps {
  lessons?: LessonByQuery[];
  isLoading: boolean;
}

export const LessonsListView = ({
  lessons = [],
  isLoading,
}: LessonsListViewProps) => {
  if (isLoading) return <Spinner />;

  return (
    <div className="px-6">
      <div className="flex flex-col gap-4">
        {TIME_SLOTS.map((timeSlot) => {
          const lessonForSlot = lessons.find(
            (lesson) => lesson.time_id === timeSlot.id,
          );
          return (
            <div key={timeSlot.id} className="flex flex-col gap-2">
              <Badge size="lg">{timeSlot.duration}</Badge>
              {lessonForSlot && <LessonCard lesson={lessonForSlot} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
