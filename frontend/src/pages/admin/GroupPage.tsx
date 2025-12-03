import { CreateGroup } from '@/features/group/components/CreateGroup';
import { GroupsList } from '@/features/group/components/GroupsList';

const GroupPage = () => {
  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Редактирование групп
          </h2>
          <p className="text-muted-foreground">
            Управляйте группами и их деталями
          </p>
        </div>
        <CreateGroup />
      </div>
      <GroupsList />
    </>
  );
};

export default GroupPage;
