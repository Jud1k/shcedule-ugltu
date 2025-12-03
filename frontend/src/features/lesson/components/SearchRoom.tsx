import { useState } from 'react';
import { Combobox } from '@/components/generic/Combobox';
import useAppSearchParams from '@/hooks/useAppSearchParams';
import { ScheduleType } from '../types/consts';
import { List } from '@/components/generic/List';
import { ListItem } from '@/components/generic/ListItem';
import useDebounce from '@/hooks/useDebounce';
import { useSearchRooms } from '../api/search-rooms';
import Spinner from '@/components/generic/Spinner';
import Badge from '@/components/generic/Badge';
import { useRoom } from '@/features/room/api/get-room';
import { useCalendar } from '@/context/CalendarProvider';

export const SearchRoom = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const { resetToToday } = useCalendar();
  const { updateParams, getParam } = useAppSearchParams();

  const roomId = getParam(ScheduleType.ROOM);

  const roomQuery = useRoom({
    roomId: roomId!,
    queryConfig: { enabled: !!roomId },
  });

  const roomsSearchQuery = useSearchRooms({
    searchTerm: debouncedSearchTerm,
    queryConfig: { enabled: !!debouncedSearchTerm },
  });
  const rooms = roomsSearchQuery.data;

  const handleRoomSelect = (roomId: string) => {
    setIsListOpen(false);
    resetToToday();
    updateParams({
      [ScheduleType.ROOM]: roomId,
      [ScheduleType.GROUP]: null,
      [ScheduleType.TEACHER]: null,
    });
    setInputValue('');
  };

  return (
    <div className="space-y-4">
      {roomQuery.data && <Badge size="xl">{roomQuery.data.name}</Badge>}
      {roomId && roomQuery.isLoading && <Spinner />}
      <Combobox
        inputValue={inputValue}
        setIsOpen={setIsListOpen}
        placeholder="Введите название аудитории"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      >
        {isListOpen && (rooms?.length ?? 0) > 0 && (
          <List>
            {rooms?.map((room) => (
              <ListItem
                key={room.id}
                onClick={() => {
                  handleRoomSelect(room.id);
                }}
              >
                {room.name}
              </ListItem>
            ))}
          </List>
        )}
        {isListOpen && roomsSearchQuery.isLoading && (
          <List>
            <Spinner />
          </List>
        )}
        {isListOpen && !roomsSearchQuery.isLoading && rooms?.length === 0 && (
          <List>
            <div className="p-3 text-center">Ничего не найдена</div>
          </List>
        )}
      </Combobox>
    </div>
  );
};
