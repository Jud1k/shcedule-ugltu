import { Button } from '@/components/generic/Button';
import { Create } from '@/components/generic/Icons';
import Modal from '@/components/generic/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createSubjectFormSchema,
  useCreateSubject,
} from '../api/create-subject';
import { FormInput } from '@/components/generic/FormInput';
import Switch from '@/components/generic/Switch';

export const CreateSubject = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSubjectFormSchema),
    defaultValues: { is_optional: true },
    mode: 'onSubmit',
  });

  const createSubjectMutation = useCreateSubject({
    mutationConfig: { onSuccess: () => setIsModalOpen(false) },
  });

  return (
    <Modal
      header="Добавить новый предмет"
      isOpen={isModalOpen}
      triggerButton={
        <Button icon={<Create />} onClick={() => setIsModalOpen(true)}>
          Добавить предмет
        </Button>
      }
      onClose={() => {
        setIsModalOpen(false);
        reset();
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          createSubjectMutation.mutate(data);
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
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          errorText={errors.semester?.message}
        ></FormInput>
        <FormInput
          label="Количество часов"
          placeholder="Введите количество часов"
          type="number"
          registration={register('total_hours', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          errorText={errors.total_hours?.message}
        ></FormInput>
        <div className="flex items-center gap-4 w-full">
          <Switch registration={register('is_optional')} />
          <span className="text-sm font-medium">Предмет обязателен</span>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={createSubjectMutation.isPending}
        >
          Добавить предмет
        </Button>
      </form>
    </Modal>
  );
};
