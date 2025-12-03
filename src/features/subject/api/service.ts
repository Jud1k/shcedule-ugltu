import { apiRoutes } from '@/api/apiRoutes';
import api from '@/api/axiosConfig';
import z from 'zod';
import { CreateSubjectForm } from './create-subject';
import { UpdateSubjectForm } from './update-subject';

export const subjectSchema = z.object({
  id: z.number().transform((val) => val.toString()),
  name: z.string(),
  semester: z.number(),
  total_hours: z.number(),
  is_optional: z.boolean(),
});

export const subjectArraySchema = z.array(subjectSchema);

export type Subject = z.infer<typeof subjectSchema>;

export default class SubjectService {
  static async fetchSubject(subjectId: string): Promise<Subject> {
    const response = await api.get<Subject>(apiRoutes.subject.byId(subjectId));
    return subjectSchema.parse(response.data);
  }

  static async fetchSubjects(): Promise<Subject[]> {
    const response = await api.get<Subject[]>(apiRoutes.subject.base);
    return subjectArraySchema.parse(response.data);
  }

  static async createSubject(subject: CreateSubjectForm): Promise<Subject> {
    const response = await api.post<Subject>(apiRoutes.subject.base, subject);
    return subjectSchema.parse(response.data);
  }

  static async updateSubject({
    subjectId,
    data,
  }: {
    subjectId: string;
    data: UpdateSubjectForm;
  }): Promise<Subject> {
    const response = await api.put<Subject>(
      apiRoutes.subject.byId(subjectId),
      data,
    );
    return subjectSchema.parse(response.data);
  }

  static async deleteSubject(subjectId: string) {
    const response = await api.delete(apiRoutes.subject.byId(subjectId));
    return response.data;
  }
}
