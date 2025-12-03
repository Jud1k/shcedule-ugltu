import { useState } from 'react';
import { Combobox } from '@/components/generic/Combobox';
import useAppSearchParams from '@/hooks/useAppSearchParams';
import { ScheduleType } from '../types/consts';
import { List } from '@/components/generic/List';
import { ListItem } from '@/components/generic/ListItem';
import useDebounce from '@/hooks/useDebounce';
import { useSearchGroups } from '../api/search-groups';
import Spinner from '@/components/generic/Spinner';
import { useGroup } from '@/features/group/api/get-group';
import Badge from '@/components/generic/Badge';
import { useCalendar } from '@/context/CalendarProvider';

export const SearchGroup = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const { resetToToday } = useCalendar();
  const { updateParams, getParam } = useAppSearchParams();

  const groupId = getParam(ScheduleType.GROUP);

  const groupQuery = useGroup({
    groupId: groupId!,
    queryConfig: { enabled: !!groupId },
  });

  const groupsSearchQuery = useSearchGroups({
    searchTerm: debouncedSearchTerm,
    queryConfig: { enabled: !!debouncedSearchTerm },
  });
  const groups = groupsSearchQuery.data;

  const handleGroupSelect = (groupId: string) => {
    setIsListOpen(false);
    resetToToday();
    updateParams({
      [ScheduleType.ROOM]: null,
      [ScheduleType.GROUP]: groupId,
      [ScheduleType.TEACHER]: null,
    });
    setInputValue('');
  };

  return (
    <div className="space-y-4">
      {groupId && groupQuery.data && (
        <Badge size="xl">{groupQuery.data.name}</Badge>
      )}
      <Combobox
        inputValue={inputValue}
        setIsOpen={setIsListOpen}
        placeholder="Введите название группы"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      >
        {isListOpen && (groups?.length ?? 0) > 0 && (
          <List>
            {groups?.map((group) => (
              <ListItem
                key={group.id}
                onClick={() => handleGroupSelect(group.id)}
              >
                {group.name}
              </ListItem>
            ))}
          </List>
        )}
        {isListOpen && groupsSearchQuery.isLoading && (
          <List>
            <Spinner />
          </List>
        )}
        {isListOpen && !groupsSearchQuery.isLoading && groups?.length === 0 && (
          <List>
            <div className="p-3 text-center">Ничего не найдена</div>
          </List>
        )}
      </Combobox>
    </div>
  );
};
