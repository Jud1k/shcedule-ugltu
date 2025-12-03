import { Update } from '@/components/generic/Icons';
import {
  UpdateGroupForm,
  useUpdateGroup,
  updateGroupFormSchema,
} from '../api/update-group';
import { useGroup } from '../api/get-group';
import { FormInput } from '@/components/generic/FormInput';
import FormSelect from '@/components/generic/FormSelect';
import Modal from '@/components/generic/Modal';
import { COURSES, INSTITUTIES } from '../types/consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/generic/Button';

interface UpdateGroupProps {
  groupId: string;
}

export const UpdateGroup = ({ groupId }: UpdateGroupProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateGroupMutation = useUpdateGroup({
    mutationConfig: { onSuccess: () => setIsModalOpen(false) },
  });

  const groupQuery = useGroup({ groupId });
  const group = groupQuery.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateGroupForm>({
    resolver: zodResolver(updateGroupFormSchema),
    mode: 'onSubmit',
  });

  return (
    <>
      <Modal
        header={'Изменить группу'}
        isOpen={isModalOpen}
        triggerButton={
          <Button
            icon={<Update />}
            onClick={() => {
              reset({ ...group });
              setIsModalOpen(true);
            }}
          />
        }
        onClose={() => setIsModalOpen(false)}
      >
        <form
          onSubmit={handleSubmit((data) =>
            updateGroupMutation.mutate({ groupId, data }),
          )}
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
          >
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
          >
            {INSTITUTIES.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </FormSelect>
          <div className="form-control w-full">
            <button
              type="submit"
              className="btn w-full"
              disabled={updateGroupMutation.isPending}
            >
              Изменить группу
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
