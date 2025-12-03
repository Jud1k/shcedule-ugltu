import { Group } from '@/features/group/api/service';
import { Room } from '@/features/room/api/service';
import { Teacher } from '@/features/teacher/api/service';

interface BaseEntityState {
  isLoading: boolean;
  error: string | null;
}

interface GroupEntityState extends BaseEntityState {
  type: 'group';
  data: Group | null;
}

interface TeacherEntityState extends BaseEntityState {
  type: 'teacher';
  data: Teacher | null;
}

interface RoomEntityState extends BaseEntityState {
  type: 'room';
  data: Room | null;
}

export type EntityState =
  | GroupEntityState
  | TeacherEntityState
  | RoomEntityState
  | {
      type: 'none';
      isLoading: false;
      error: null;
      data: null;
    };
