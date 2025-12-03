import { useState } from 'react';
import { useBuildings } from '../api/get-buildings';
import { Button } from '@/components/generic/Button';
import { FormInput } from '@/components/generic/FormInput';
import FormSelect from '@/components/generic/FormSelect';
import { Update } from '@/components/generic/Icons';
import Modal from '@/components/generic/Modal';
import Switch from '@/components/generic/Switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  UpdateRoomForm,
  updateRoomFormSchema,
  useUpdateRoom,
} from '../api/update-room';
import { useRoom } from '../api/get-room';

interface UpdateRoomProps {
  roomId: string;
}

export const UpdateRoom = ({ roomId }: UpdateRoomProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateRoomForm>({
    resolver: zodResolver(updateRoomFormSchema),
    mode: 'onSubmit',
  });

  const statusValue = watch('status');

  const updateRoomMutation = useUpdateRoom({
    mutationConfig: {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
      },
    },
  });

  const roomQuery = useRoom({ roomId });
  const room = roomQuery.data;

  const buildingsQuery = useBuildings({});
  const buildings = buildingsQuery.data;

  return (
    <Modal
      header="Изменить аудиторию"
      triggerButton={
        <Button
          icon={<Update />}
          onClick={() => {
            reset({
              name: room?.name,
              floor: room?.floor,
              capacity: room?.capacity,
              building_id: room?.building?.id,
              status: room?.status,
            });
            setIsModalOpen(true);
          }}
        />
      }
      onClose={() => {
        setIsModalOpen(false);
      }}
      isOpen={isModalOpen}
    >
      <form
        className="flex flex-col items-center justify-center space-y-4 w-full"
        onSubmit={handleSubmit((data) =>
          updateRoomMutation.mutate({ roomId, data }),
        )}
      >
        <FormInput
          label="Название аудитории"
          placeholder="Введите название аудитории"
          registration={register('name')}
          errorText={errors.name?.message}
        />
        <FormInput
          label="Номер этажа"
          placeholder="Введите номер этажа"
          type="number"
          registration={register('floor', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          errorText={errors.floor?.message}
        />
        <FormInput
          label="Вместимость"
          placeholder="Введите вместимость ауд."
          type="number"
          registration={register('capacity', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          errorText={errors.capacity?.message}
        />
        <FormSelect
          label="Корпус"
          registration={register('building_id', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          errorText={errors.building_id?.message}
        >
          {buildings?.map((build) => (
            <option key={build.id} value={build.id}>
              {build.name}
            </option>
          ))}
        </FormSelect>
        <div className="flex items-center gap-4 w-full">
          <Switch
            checked={statusValue === 1}
            onChange={(e) => setValue('status', e.target.checked ? 1 : 0)}
          />
          <span className="text-sm font-medium">Аудитория доступна</span>
        </div>
        <div className="form-control w-full">
          <button
            type="submit"
            className="btn w-full"
            disabled={updateRoomMutation.isPending}
          >
            Изменить аудиторию
          </button>
        </div>
      </form>
    </Modal>
  );
};
