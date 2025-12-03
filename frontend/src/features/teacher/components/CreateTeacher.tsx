import { Button } from '@/components/generic/Button';
import { Create } from '@/components/generic/Icons';
import Modal from '@/components/generic/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createTeacherFormSchema,
  useCreateTeacher,
} from '../api/create-teacher';
import { FormInput } from '@/components/generic/FormInput';
import FormSelect from '@/components/generic/FormSelect';
import { DEPARTMENTS, TITLES } from '../types/consts';

export const CreateTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTeacherFormSchema),
    mode: 'onSubmit',
  });

  const createTeacherMutation = useCreateTeacher({
    mutationConfig: {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    },
  });
  return (
    <Modal
      header="Добавить нового преподавателя"
      isOpen={isModalOpen}
      triggerButton={
        <Button icon={<Create />} onClick={() => setIsModalOpen(true)}>
          Добавить преподавателя
        </Button>
      }
      onClose={() => {
        setIsModalOpen(false);
        reset();
      }}
    >
      <form
        className="flex flex-col items-center justify-center space-y-4 w-full"
        onSubmit={handleSubmit((data) => createTeacherMutation.mutate(data))}
      >
        <FormInput
          label="Фамилия"
          type="text"
          placeholder="Введите фамилию"
          registration={register('last_name')}
          errorText={errors.last_name?.message}
        />
        <FormInput
          label="Имя"
          type="text"
          placeholder="Введите имя"
          registration={register('first_name')}
          errorText={errors.first_name?.message}
        />
        <FormInput
          label="Отчество"
          type="text"
          placeholder="Введите отчество"
          registration={register('middle_name')}
          errorText={errors.middle_name?.message}
        />
        <div className="grid grid-cols-2 gap-4 w-full">
          <FormInput
            label="Email"
            type="email"
            placeholder="Введите email"
            registration={register('email')}
            errorText={errors.email?.message}
          />
          <FormInput
            label="Телефон"
            type="text"
            placeholder="Введите телефон"
            registration={register('phone')}
            errorText={errors.phone?.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <FormSelect
            label="Кафедра"
            registration={register('department')}
            errorText={errors.department?.message}
            defaultValue=""
          >
            <option value="" disabled>
              Выберите кафедру
            </option>
            {DEPARTMENTS.map((depart) => (
              <option key={depart} value={depart}>
                {depart}
              </option>
            ))}
          </FormSelect>
          <FormSelect
            label="Степень"
            registration={register('title')}
            errorText={errors.title?.message}
            defaultValue=""
          >
            <option value="" disabled>
              Выберите степень
            </option>
            {TITLES.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </FormSelect>
        </div>
        <Button
          type="submit"
          disabled={createTeacherMutation.isPending}
          className="w-full"
        >
          Добавить преподавателя
        </Button>
      </form>
    </Modal>
  );
};
