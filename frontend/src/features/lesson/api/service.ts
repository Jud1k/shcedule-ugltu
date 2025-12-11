import api from '@/api/axiosConfig';
import z from 'zod';
import { CreateLessonForm } from './create-lesson';
import { apiRoutes } from '@/api/apiRoutes';
import { subjectSchema } from '@/features/subject/api/service';
import { teacherSchema } from '@/features/teacher/api/service';
import { roomSchema } from '@/features/room/api/service';
import { groupSchema } from '@/features/group/api/service';
import { UpdateLessonForm } from './update-lesson';
import { DeleteLesson } from '../components/DeleteLesson';

export const lessonSchema = z.object({
  id: z.number().transform((val) => val.toString()),
  time_id: z.number(),
  day_of_week: z.number(),
  type: z.string(),
  subject_id: z.number(),
  teacher_id: z.number(),
  room_id: z.number(),
  group_id: z.number(),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const lessonByQuerySchema = z.object({
  id: z.number().transform((val) => val.toString()),
  time_id: z.number(),
  day_of_week: z.number(),
  type: z.string(),
  subject: subjectSchema,
  teacher: teacherSchema,
  room: roomSchema,
  group: groupSchema,
});

export type LessonByQuery = z.infer<typeof lessonByQuerySchema>;

export const lessonByQueryArraySchema = z.array(lessonByQuerySchema);

interface fetchLessonsQuery {
  group?: string;
  teacher?: string;
  room?: string;
}

export default class LessonService {
  static async fetchLessonsByQuery(
    query: fetchLessonsQuery,
  ): Promise<LessonByQuery[]> {
    const response = await api.get<LessonByQuery[]>(apiRoutes.lesson.base, {
      params: { ...query },
    });
    return lessonByQueryArraySchema.parse(response.data);
  }

  static async createLesson(lesson: CreateLessonForm): Promise<Lesson> {
    const response = await api.post(apiRoutes.lesson.base, lesson);
    return lessonSchema.parse(response.data);
  }

  static async updateLesson({
    lessonId,
    data,
  }: {
    lessonId: string;
    data: UpdateLessonForm;
  }): Promise<Lesson> {
    const response = await api.put(apiRoutes.lesson.byId(lessonId), data);
    return lessonSchema.parse(response.data);
  }

  static async deleteLesson(lessonId: string) {
    const response = await api.delete(apiRoutes.lesson.byId(lessonId));
    return response.data;
  }
}
