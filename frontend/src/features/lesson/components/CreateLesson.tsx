import { Button } from '@/components/generic/Button';
import FormSelect from '@/components/generic/FormSelect';
import { Create } from '@/components/generic/Icons';
import Modal from '@/components/generic/Modal';
import { useState } from 'react';
import { DAYS_OF_WEAK, LESSON_TYPES, TIME_SLOTS } from '../types/consts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLessonSchema, useCreateLesson } from '../api/create-lesson';
import { AutocompleteTeacher } from './AutocompleteTeacher';
import AutocompleteRoom from './AutocompleteRoom';
import { AutocompleteGroup } from './AutocompleteGroup';
import AutocompleteSubject from './AutocompleteSubject';

type InputValues = {
  teacher: string;
  room: string;
  group: string;
  subject: string;
};

export function CreateLesson() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<InputValues>({
    teacher: '',
    room: '',
    group: '',
    subject: '',
  });

  const handleInputChange = (field: keyof InputValues, value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  const resetAll = () => {
    reset();
    setInputValues({
      teacher: '',
      room: '',
      group: '',
      subject: '',
    });
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(createLessonSchema),
    mode: 'onSubmit',
    defaultValues: {
      room_id: '',
      teacher_id: '',
      subject_id: '',
      group_id: '',
    },
  });

  const createLessonMutation = useCreateLesson({
    mutationConfig: {
      onSuccess: () => {
        reset();
        setIsModalOpen(false);
        resetAll();
      },
    },
  });

  return (
    <Modal
      header="Добавить пару"
      isOpen={isModalOpen}
      triggerButton={
        <Button icon={<Create />} onClick={() => setIsModalOpen(true)}>
          Создать пару
        </Button>
      }
      onClose={() => {
        setIsModalOpen(false);
        resetAll();
      }}
    >
      <form
        onSubmit={handleSubmit((data) => createLessonMutation.mutate(data))}
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
          disabled={createLessonMutation.isPending}
        >
          Добавить пару
        </Button>
      </form>
    </Modal>
  );
}
