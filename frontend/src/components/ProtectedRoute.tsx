import useAuth, { isLoggedIn } from '@/hooks/useAuth';
import { RoleName } from '@/types';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: RoleName;
}

const ProtectedRoute = ({
  children,
  requiredRole = 'user',
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Проверка авторизации...</div>;

  if (!isLoggedIn || user?.role !== requiredRole)
    return <Navigate to="/login" />;

  if (user && user?.role !== requiredRole) return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
