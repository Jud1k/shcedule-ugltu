import { FormAutocomplete } from '@/components/generic/FormAutocomplete';
import { ListItem } from '@/components/generic/ListItem';
import { List } from '@/components/generic/List';
import Spinner from '@/components/generic/Spinner';
import { useRooms } from '@/features/room/api/get-rooms';
import { useState } from 'react';

interface AutocompleteRoomProps {
  errorText?: string;
  onClick: (id: string) => void;
  value: string;
  onChange: (value: string) => void;
}

export default function AutocompleteRoom({
  errorText,
  onClick,
  value = '',
  onChange,
}: AutocompleteRoomProps) {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const roomsQuery = useRooms({});
  const rooms = roomsQuery.data;

  const filtredrooms = rooms?.filter((room) => {
    const input = value.toLowerCase().trim();
    const matchesrooms = room.name.toLowerCase().includes(input);
    return matchesrooms;
  });

  const handleRoomselect = (roomId: string, roomName: string) => {
    onChange(roomName);
    onClick(roomId);
    setIsListOpen(false);
  };

  return (
    <FormAutocomplete
      label="Аудитория"
      placeholder="Введите название аудитории"
      errorText={errorText}
      inputValue={value}
      onChange={(e) => onChange(e.target.value)}
      setIsOpen={setIsListOpen}
    >
      {isListOpen && (rooms?.length ?? 0) > 0 && (
        <List>
          {filtredrooms?.map((room) => (
            <ListItem
              key={room.id}
              onClick={() => handleRoomselect(room.id, room.name)}
            >
              {room.name}
            </ListItem>
          ))}
        </List>
      )}
      {isListOpen && roomsQuery.isLoading && (
        <List>
          <Spinner />
        </List>
      )}
      {isListOpen && !roomsQuery.isLoading && rooms?.length === 0 && (
        <List>
          <div className="p-3 text-center">Ничего не найдена</div>
        </List>
      )}
    </FormAutocomplete>
  );
}
