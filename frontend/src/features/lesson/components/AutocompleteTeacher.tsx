import { FormAutocomplete } from '@/components/generic/FormAutocomplete';
import { ListItem } from '@/components/generic/ListItem';
import { List } from '@/components/generic/List';
import Spinner from '@/components/generic/Spinner';
import { useTeachers } from '@/features/teacher/api/get-teachers';
import { useState } from 'react';
import { Teacher } from '@/features/teacher/api/service';

interface AutocompleteTeacherProps {
  onClick: (id: string) => void;
  errorText?: string;
  value: string;
  onChange: (value: string) => void;
}

export const AutocompleteTeacher = ({
  onClick,
  errorText,
  value = '',
  onChange,
}: AutocompleteTeacherProps) => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const teachersQuery = useTeachers({});
  const teachers = teachersQuery.data;

  const filteredTeachers = teachers?.filter((teacher) => {
    const input = value.toLowerCase().trim();
    const fullName =
      `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name || ''}`
        .toLowerCase()
        .trim();

    return fullName.includes(input);
  });

  const handleTeacherSelect = (teacher: Teacher) => {
    const fullName =
      `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name || ''}`.trim();
    onChange(fullName);
    onClick(teacher.id);
    setIsListOpen(false);
  };

  return (
    <FormAutocomplete
      setIsOpen={setIsListOpen}
      label="Учитель"
      placeholder="Введите ФИО учителя"
      errorText={errorText}
      inputValue={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {isListOpen && (teachers?.length ?? 0) > 0 && (
        <List>
          {filteredTeachers?.map((teacher) => (
            <ListItem
              key={teacher.id}
              onClick={() => {
                handleTeacherSelect(teacher);
              }}
            >
              {`${teacher.last_name} ${teacher.first_name} ${teacher.middle_name || ''}`}
            </ListItem>
          ))}
        </List>
      )}
      {isListOpen && teachersQuery.isLoading && (
        <List>
          <Spinner />
        </List>
      )}
      {isListOpen &&
        !teachersQuery.isLoading &&
        filteredTeachers?.length === 0 && (
          <List>
            <div className="p-3 text-center">Ничего не найдено</div>
          </List>
        )}
    </FormAutocomplete>
  );
};
