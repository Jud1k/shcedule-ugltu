import Modal from '@/components/generic/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  CreateGroupForm,
  createGroupFormSchema,
  useCreateGroup,
} from '../api/create-group';
import FormSelect from '@/components/generic/FormSelect';
import { useState } from 'react';
import { FormInput } from '@/components/generic/FormInput';
import { COURSES, INSTITUTIES } from '../types/consts';
import { Button } from '@/components/generic/Button';
import { Create } from '@/components/generic/Icons';

export const CreateGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGroupForm>({
    resolver: zodResolver(createGroupFormSchema),
    mode: 'onSubmit',
  });

  const createGroupMutation = useCreateGroup({
    mutationConfig: {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    },
  });

  return (
    <Modal
      header={'Добавить новую группу'}
      triggerButton={
        <Button
          icon={<Create />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Добавить группу
        </Button>
      }
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        reset();
      }}
    >
      <form
        onSubmit={handleSubmit((data) => createGroupMutation.mutate(data))}
        className="flex flex-col items-center justify-center space-y-4 w-full"
      >
        <FormInput
          label="Название группы"
          placeholder="Введите название группы"
          errorText={errors.name?.message}
          registration={register('name')}
        />
        <FormSelect
          label="Курс"
          registration={register('course', {
            setValueAs: (value) => (value === '' ? undefined : Number(value)),
          })}
          errorText={errors.course?.message}
          defaultValue=""
        >
          <option value="" disabled>
            Выберите курс
          </option>
          {COURSES.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </FormSelect>
        <FormSelect
          label="Институт"
          registration={register('institute')}
          errorText={errors.institute?.message}
          defaultValue=""
        >
          <option value="" disabled>
            Выберите институт
          </option>
          {INSTITUTIES.map((inst) => (
            <option key={inst} value={inst}>
              {inst}
            </option>
          ))}
        </FormSelect>
        <Button
          type="submit"
          className="w-full"
          disabled={createGroupMutation.isPending}
        >
          Добавить группу
        </Button>
      </form>
    </Modal>
  );
};
