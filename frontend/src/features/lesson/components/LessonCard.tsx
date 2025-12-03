import { LessonByQuery } from '../api/service';
import { MdOutlineRoom } from 'react-icons/md';
import { SlGraduation } from 'react-icons/sl';
import { GrGroup } from 'react-icons/gr';

import Badge from '@/components/generic/Badge';

interface LessonCardProps {
  lesson: LessonByQuery;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  return (
    <div className="card card-lg w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h1 className="card-title flex-1">{lesson.subject.name}</h1>
          <Badge size="lg">{lesson.type}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <GrGroup />
          <p>{lesson.group.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineRoom />
          <p>{lesson.room.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <SlGraduation />
          <p>
            {lesson.teacher.last_name}{' '}
            {lesson.teacher.first_name[0].toUpperCase()}.{' '}
            {lesson.teacher.middle_name
              ? `${lesson.teacher.middle_name[0]?.toUpperCase()}.`
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
