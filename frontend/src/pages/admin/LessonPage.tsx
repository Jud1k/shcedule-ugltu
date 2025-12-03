import { CreateLesson } from '@/features/lesson/components/CreateLesson';
import { LessonsList } from '@/features/lesson/components/LessonsList';
import { ScheduleSidebar } from '@/features/lesson/components/ScheduleSidebar';

export default function LessonPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="md:w-3/5 lg:w-2/3 md:pr-8">
          <LessonsList />
        </div>
        <div className="md:w-2/5 lg:w-1/3 max-w-md mx-auto md:mx-0 sticky top-4">
          <div className="mb-4">
            <CreateLesson />
          </div>
          <ScheduleSidebar />
        </div>
      </div>
    </div>
  );
}
