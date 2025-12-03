import { Button } from '@/components/generic/Button';
import { FormInput } from '@/components/generic/FormInput';
import { Update } from '@/components/generic/Icons';
import Modal from '@/components/generic/Modal';
import Switch from '@/components/generic/Switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Subject } from '../api/service';
import {
  updateSubjectFormSchema,
  useUpdateSubject,
} from '../api/update-subject';

interface UpdateSubjectProps {
  subject: Subject;
}

export const UpdateSubject = ({ subject }: UpdateSubjectProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateSubjectFormSchema),
    mode: 'onSubmit',
  });

  const updateSubjectMutation = useUpdateSubject({
    mutationConfig: { onSuccess: () => setIsModalOpen(false) },
  });

  return (
    <Modal
      header="Добавить новый предмет"
      isOpen={isModalOpen}
      triggerButton={
        <Button
          icon={<Update />}
          onClick={() => {
            reset({ ...subject });
            setIsModalOpen(true);
          }}
        />
      }
      onClose={() => {
        setIsModalOpen(false);
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          updateSubjectMutation.mutate({ subjectId: subject.id, data });
        })}
        className='className="flex flex-col items-center justify-center space-y-4 w-full'
      >
        <FormInput
          label="Название предмета"
          placeholder="Введите название предмета"
          type="text"
          registration={register('name')}
          errorText={errors.name?.message}
        ></FormInput>
        <FormInput
          label="Cеместр"
          placeholder="Введите номер семестра"
          type="number"
          registration={register('semester', {
            setValueAs: (value) => (value === '' ? undefined : Number(value)),
          })}
          errorText={errors.semester?.message}
        ></FormInput>
        <FormInput
          label="Количество часов"
          placeholder="Введите количество часов"
          type="number"
          registration={register('total_hours', {
            setValueAs: (value) => (value === '' ? undefined : Number(value)),
          })}
          errorText={errors.total_hours?.message}
        ></FormInput>
        <div className="flex items-center gap-4 w-full">
          <Switch registration={register('is_optional')} />
          <span className="text-sm font-medium">Аудитория доступна</span>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={updateSubjectMutation.isPending}
        >
          Изменить предмет
        </Button>
      </form>
    </Modal>
  );
};
