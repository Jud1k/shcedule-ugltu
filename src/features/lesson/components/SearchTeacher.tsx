import { useState } from 'react';
import { Combobox } from '@/components/generic/Combobox';
import useAppSearchParams from '@/hooks/useAppSearchParams';
import { ScheduleType } from '../types/consts';
import { List } from '@/components/generic/List';
import { ListItem } from '@/components/generic/ListItem';
import useDebounce from '@/hooks/useDebounce';
import Spinner from '@/components/generic/Spinner';
import { useSearchTeachers } from '../api/search-teachers';
import { useTeacher } from '@/features/teacher/api/get-teacher';
import Badge from '@/components/generic/Badge';
import { useCalendar } from '@/context/CalendarProvider';

export const SearchTeacher = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const { resetToToday } = useCalendar();
  const { updateParams, getParam } = useAppSearchParams();

  const teacherId = getParam(ScheduleType.TEACHER);

  const teacherQuery = useTeacher({
    teacherId: teacherId!,
    queryConfig: { enabled: !!teacherId },
  });

  const searchTeachersQuery = useSearchTeachers({
    searchTerm: debouncedSearchTerm,
    queryConfig: { enabled: !!debouncedSearchTerm },
  });
  const teachers = searchTeachersQuery.data;

  const handleTeacherSelect = (teacherId: string) => {
    setIsListOpen(false);
    resetToToday();
    updateParams({
      [ScheduleType.ROOM]: null,
      [ScheduleType.GROUP]: null,
      [ScheduleType.TEACHER]: teacherId,
    });
    setInputValue('');
  };

  return (
    <div className="space-y-4">
      {teacherQuery.data && (
        <Badge size="xl">
          {teacherQuery.data.last_name}{' '}
          {teacherQuery.data.first_name[0].toUpperCase()}.{' '}
          {teacherQuery.data.middle_name
            ? `${teacherQuery.data.middle_name[0]?.toUpperCase()}.`
            : ''}
        </Badge>
      )}
      {teacherId && teacherQuery.isLoading && <Spinner />}
      <Combobox
        inputValue={inputValue}
        setIsOpen={setIsListOpen}
        placeholder="Введите имя преподавателя"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      >
        {isListOpen && (teachers?.length ?? 0) > 0 && (
          <List>
            {teachers?.map((teacher) => (
              <ListItem
                key={teacher.id}
                onClick={() => handleTeacherSelect(teacher.id)}
              >
                {teacher.last_name} {teacher.first_name}{' '}
                {teacher.middle_name ? teacher.middle_name : ''}
              </ListItem>
            ))}
          </List>
        )}
        {isListOpen && searchTeachersQuery.isLoading && (
          <List>
            <Spinner />
          </List>
        )}
        {isListOpen &&
          !searchTeachersQuery.isLoading &&
          teachers?.length === 0 && (
            <List>
              <div className="p-3 text-center">Ничего не найдена</div>
            </List>
          )}
      </Combobox>
    </div>
  );
};
