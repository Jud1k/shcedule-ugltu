import Badge from '@/components/generic/Badge';
import { LessonByQuery } from '../api/service';
import { LessonCard } from './LessonCard';
import { TIME_SLOTS } from '../types/consts';

interface ScheduleViewListProps {
  lessons?: LessonByQuery[];
  selectedDayWeek?: number;
}

export const ScheduleViewList = ({
  lessons = [],
  selectedDayWeek,
}: ScheduleViewListProps) => {
  const filtredLessons = lessons?.filter(
    (lesson) => lesson.day_of_week === selectedDayWeek,
  );
  return (
    <div className="px-6">
      <div className="flex flex-col gap-4">
        {TIME_SLOTS.map((timeSlot) => {
          const lessonForSlot = filtredLessons.find(
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
