import z from 'zod';
import { CreateGroupForm } from './create-group';
import api from '@/api/axiosConfig';
import { UpdateGroupForm } from './update-group';
import { apiRoutes } from '@/api/apiRoutes';

export const groupSchema = z.object({
  id: z.number().transform((val) => val.toString()),
  name: z.string(),
  course: z.number(),
  institute: z.string(),
});

export const groupArraySchema = z.array(groupSchema);

export type Group = z.infer<typeof groupSchema>;

export const groupSummarySchema = z.object({
  id: z.number().transform((val) => val.toString()),
  name: z.string(),
  course: z.number(),
  institute: z.string(),
  count_students: z.number(),
});

export const groupSummaryArraySchema = z.array(groupSummarySchema);

export type GroupSummary = z.infer<typeof groupSummarySchema>;

export default class GroupService {
  static async searchGroups(searchParams: string): Promise<Group[]> {
    const response = await api.get<Group[]>(apiRoutes.group.search, {
      params: { query: searchParams },
    });
    return groupArraySchema.parse(response.data);
  }

  static async fetchGroup(groupId: string): Promise<Group> {
    const response = await api.get<Group>(apiRoutes.group.byId(groupId));
    return groupSchema.parse(response.data);
  }
  static async fetchGroups(): Promise<Group[]> {
    const response = await api.get(apiRoutes.group.base);
    return groupArraySchema.parse(response.data);
  }
  static async fetchGroupSummary(): Promise<GroupSummary[]> {
    const response = await api.get<GroupSummary[]>(apiRoutes.group.summary);
    return groupSummaryArraySchema.parse(response.data);
  }

  static async createGroup(group: CreateGroupForm): Promise<Group> {
    const response = await api.post<Group>(apiRoutes.group.base, group);
    return groupSchema.parse(response.data);
  }

  static async deleteGroup(groupId: string): Promise<void> {
    const response = await api.delete(apiRoutes.group.byId(groupId));
    return response.data;
  }

  static async updateGroup({
    groupId,
    data,
  }: {
    groupId: string;
    data: UpdateGroupForm;
  }): Promise<Group> {
    const response = await api.put(apiRoutes.group.byId(groupId), data);
    return groupSchema.parse(response.data);
  }
}
