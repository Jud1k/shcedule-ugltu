import { Route, Routes } from 'react-router';
import Layout from '../components/layouts/Layout';
import HomePage from '../pages/HomePage';
import SchedulePage from '../pages/schedule/SchedulePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../components/layouts/AdminLayout';
import GroupPage from '../pages/admin/GroupPage';
import SubjectPage from '../pages/admin/SubjectPage';
import TeacherPage from '../pages/admin/TeacherPage';
import RoomPage from '../pages/admin/RoomPage';
import LessonPage from '@/pages/admin/LessonPage';
import PublicOnlyRoute from '@/components/PublicOnlyRoute';

const RoutesProvider = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route
          path="login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
      </Route>
      <Route
        path="admin"
        element={
          // <ProtectedRoute requiredRole="admin">
          <AdminLayout />
          // </ProtectedRoute>
        }
      >
        <Route path="schedule" element={<LessonPage />} />
        <Route path="subject" element={<SubjectPage />} />
        <Route path="teacher" element={<TeacherPage />} />
        <Route path="room" element={<RoomPage />} />
        <Route path="group" element={<GroupPage />} />
      </Route>
    </Routes>
  );
};

export default RoutesProvider;
