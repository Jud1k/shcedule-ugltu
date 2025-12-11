import Modal from '@/components/generic/Modal';
import { LessonByQuery } from '../api/service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateLessonForm,
  updateLessonSchema,
  useUpdateLesson,
} from '../api/update-lesson';
import { Button } from '@/components/generic/Button';
import FormSelect from '@/components/generic/FormSelect';
import {
  TIME_SLOTS,
  DAYS_OF_WEAK,
  LESSON_TYPES,
  InputValues,
} from '../types/consts';
import { AutocompleteGroup } from './AutocompleteGroup';
import AutocompleteRoom from './AutocompleteRoom';
import AutocompleteSubject from './AutocompleteSubject';
import { AutocompleteTeacher } from './AutocompleteTeacher';
import { useEffect, useState } from 'react';
import { DeleteLesson } from './DeleteLesson';

interface UpdateLessonProps {
  lesson: LessonByQuery;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateLesson = ({
  lesson,
  isOpen,
  onClose,
}: UpdateLessonProps) => {
  const [inputValues, setInputValues] = useState<InputValues>({
    teacher: lesson.teacher?.last_name || '',
    room: lesson.room?.name || '',
    group: lesson.group?.name || '',
    subject: lesson.subject?.name || '',
  });

  const handleInputChange = (field: keyof InputValues, value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };
  const updateLessonMutation = useUpdateLesson({
    mutationConfig: {
      onSuccess: () => onClose(),
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateLessonForm>({
    resolver: zodResolver(updateLessonSchema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    setValue('day_of_week', lesson.day_of_week.toString());
    setValue('time_id', lesson.time_id.toString());
    setValue('type', lesson.type);
    setValue('group_id', lesson.group.id);
    setValue('room_id', lesson.room.id);
    setValue('subject_id', lesson.subject.id);
    setValue('teacher_id', lesson.teacher.id);
  }, [isOpen, lesson, setValue]);

  return (
    <>
      <Modal header="Изменить пару" isOpen={isOpen} onClose={onClose}>
        <form
          onSubmit={handleSubmit((data) =>
            updateLessonMutation.mutate({ lessonId: lesson.id, data }),
          )}
          className="flex flex-col items-center justify-center space-y-4 w-full"
        >
          <AutocompleteTeacher
            value={inputValues.teacher}
            onChange={(value) => handleInputChange('teacher', value)}
            errorText={errors.teacher_id?.message}
            onClick={(id) => setValue('teacher_id', id)}
          />
          <AutocompleteRoom
            value={inputValues.room}
            onChange={(value) => handleInputChange('room', value)}
            errorText={errors.room_id?.message}
            onClick={(id) => setValue('room_id', id)}
          />
          <AutocompleteGroup
            value={inputValues.group}
            onChange={(value) => handleInputChange('group', value)}
            errorText={errors.group_id?.message}
            onClick={(id) => setValue('group_id', id)}
          />
          <AutocompleteSubject
            value={inputValues.subject}
            onChange={(value) => handleInputChange('subject', value)}
            errorText={errors.subject_id?.message}
            onClick={(id) => setValue('subject_id', id)}
          />
          <div className="grid grid-cols-3 gap-4 w-full">
            <FormSelect
              label="Время"
              registration={register('time_id')}
              errorText={errors.time_id?.message}
              defaultValue=""
            >
              <option value="" disabled>
                Выберите время
              </option>
              {TIME_SLOTS.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.duration}
                </option>
              ))}
            </FormSelect>

            <FormSelect
              label="День недели"
              registration={register('day_of_week')}
              errorText={errors.day_of_week?.message}
              defaultValue=""
            >
              <option value="" disabled>
                Выберите день недели
              </option>
              {DAYS_OF_WEAK.map((day) => (
                <option key={day.id} value={day.id}>
                  {day.name}
                </option>
              ))}
            </FormSelect>
            <FormSelect
              label="Тип пары"
              registration={register('type')}
              errorText={errors.type?.message}
              defaultValue=""
            >
              <option value="" disabled>
                Выберите тип пары
              </option>
              {LESSON_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </FormSelect>
          </div>
          <Button
            type="submit"
            className="w-full"
            variant="base"
            disabled={updateLessonMutation.isPending}
          >
            Изменить пару
          </Button>
        </form>
        <div className="mt-4">
          <DeleteLesson lessonId={lesson.id} onSuccess={onClose} />
        </div>
      </Modal>
    </>
  );
};
