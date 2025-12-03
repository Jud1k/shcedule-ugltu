import { FormAutocomplete } from '@/components/generic/FormAutocomplete';
import { ListItem } from '@/components/generic/ListItem';
import { List } from '@/components/generic/List';
import Spinner from '@/components/generic/Spinner';
import { useSubjects } from '@/features/subject/api/get-subjects';
import { useState } from 'react';

interface AutocompleteSubjectProps {
  errorText?: string;
  onClick: (id: string) => void;
  value: string;
  onChange: (value: string) => void;
}
export default function AutocompleteSubject({
  errorText,
  onClick,
  value = '',
  onChange,
}: AutocompleteSubjectProps) {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const subjectsQuery = useSubjects({});
  const subjects = subjectsQuery.data;

  const filtredSubjects = subjects?.filter((subject) => {
    const input = value.toLowerCase().trim();
    const matchesSubjects = subject.name.toLowerCase().includes(input);
    return matchesSubjects;
  });

  const handleSubjectSelect = (subjectId: string, subjectName: string) => {
    onChange(subjectName);
    onClick(subjectId);
    setIsListOpen(false);
  };

  return (
    <FormAutocomplete
      label="Предмет"
      placeholder="Введите название предмета"
      errorText={errorText}
      inputValue={value}
      onChange={(e) => onChange(e.target.value)}
      setIsOpen={setIsListOpen}
    >
      {isListOpen && (subjects?.length ?? 0) > 0 && (
        <List>
          {filtredSubjects?.map((subject) => (
            <ListItem
              key={subject.id}
              onClick={() => handleSubjectSelect(subject.id, subject.name)}
            >
              {subject.name}
            </ListItem>
          ))}
        </List>
      )}
      {isListOpen && subjectsQuery.isLoading && (
        <List>
          <Spinner />
        </List>
      )}
      {isListOpen && !subjectsQuery.isLoading && subjects?.length === 0 && (
        <List>
          <div className="p-3 text-center">Ничего не найдена</div>
        </List>
      )}
    </FormAutocomplete>
  );
}
