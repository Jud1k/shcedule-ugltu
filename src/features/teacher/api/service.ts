import { apiRoutes } from '@/api/apiRoutes';
import api from '@/api/axiosConfig';
import z from 'zod';
import { CreateTeacherForm } from './create-teacher';
import { UpdateTeacherForm } from './update-teacher';

export const teacherSchema = z.object({
  id: z.number().transform((val) => val.toString()),
  first_name: z.string(),
  middle_name: z.string().nullable(),
  last_name: z.string(),
  email: z.email().nullable(),
  phone: z.string().nullable(),
  department: z.string(),
  title: z.string(),
});

export const teacherArraySchema = z.array(teacherSchema);

export type Teacher = z.infer<typeof teacherSchema>;

export default class TeacherService {
  static async searchTeachers(searchParams: string): Promise<Teacher[]> {
    const response = await api.get<Teacher[]>(apiRoutes.teacher.search, {
      params: { query: searchParams },
    });
    return teacherArraySchema.parse(response.data);
  }

  static async fetchTeachers(): Promise<Teacher[]> {
    const response = await api.get<Teacher[]>(apiRoutes.teacher.base);
    return teacherArraySchema.parse(response.data);
  }

  static async fetchTeacher(teacherId: string): Promise<Teacher> {
    const response = await api.get<Teacher>(apiRoutes.teacher.byId(teacherId));
    return teacherSchema.parse(response.data);
  }

  static async createTeacher(teacher: CreateTeacherForm): Promise<Teacher> {
    const response = await api.post<Teacher>(apiRoutes.teacher.base, teacher);
    return teacherSchema.parse(response.data);
  }

  static async updateTeacher({
    teacherId,
    data,
  }: {
    teacherId: string;
    data: UpdateTeacherForm;
  }): Promise<Teacher> {
    const response = await api.put(apiRoutes.teacher.byId(teacherId), data);
    return response.data;
  }

  static async deleteTeacher(teacherId: string): Promise<void> {
    const response = await api.delete(apiRoutes.teacher.byId(teacherId));
    return response.data;
  }
}
