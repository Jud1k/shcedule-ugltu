import { CreateRoom } from '@/features/room/components/CreateRoom';
import { RoomsList } from '@/features/room/components/RoomsList';

const RoomPage = () => {
  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Редактирование аудиторий
          </h2>
          <p className="text-muted-foreground">
            Управляйте аудиториями и их деталями
          </p>
        </div>
        <CreateRoom />
      </div>
      <RoomsList />
    </>
  );
};

export default RoomPage;
