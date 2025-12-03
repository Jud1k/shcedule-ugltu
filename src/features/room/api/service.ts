import api from '@/api/axiosConfig';
import { apiRoutes } from '@/api/apiRoutes';
import { CreateRoomForm } from './create-room';
import z from 'zod';
import { UpdateRoomForm } from './update-room';

export const buildingSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
});

export const buildingArraySchema = z.array(buildingSchema);

export type Building = z.infer<typeof buildingSchema>;

export const roomSchema = z.object({
  id: z.number().transform((val) => val.toString()),
  name: z.string(),
  floor: z.number(),
  capacity: z.number(),
  status: z.number(),
  building: buildingSchema.optional(),
});

export const roomArraySchema = z.array(roomSchema);

export type Room = z.infer<typeof roomSchema>;

export default class RoomService {
  static async searchRooms(searchParams: string): Promise<Room[]> {
    const response = await api.get<Room[]>(apiRoutes.room.search, {
      params: { query: searchParams },
    });
    return roomArraySchema.parse(response.data);
  }
  static async fetchRooms(): Promise<Room[]> {
    const response = await api.get(apiRoutes.room.base);
    return roomArraySchema.parse(response.data);
  }

  static async fetchRoom(roomId: string): Promise<Room> {
    const response = await api.get(apiRoutes.room.byId(roomId));
    return roomSchema.parse(response.data);
  }

  static async fetchBuildings(): Promise<Building[]> {
    const response = await api.get(apiRoutes.building.base);
    return buildingArraySchema.parse(response.data);
  }

  static async createRoom(room: CreateRoomForm): Promise<Room> {
    const response = await api.post(apiRoutes.room.base, room);
    return roomSchema.parse(response.data);
  }

  static async updateRoom({
    roomId,
    data,
  }: {
    roomId: string;
    data: UpdateRoomForm;
  }): Promise<Room> {
    const response = await api.put(apiRoutes.room.byId(roomId), data);
    return roomSchema.parse(response.data);
  }

  static async deleteRoom(roomId: string): Promise<void> {
    const response = await api.delete(apiRoutes.room.byId(roomId));
    return response.data;
  }
}
