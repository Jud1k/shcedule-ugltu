import useAuth, { isLoggedIn } from '@/hooks/useAuth';
import { Link } from 'react-router';

const UserAuthWidget = () => {
  const { user, logoutMutation } = useAuth();

  if (isLoggedIn() && !user) {
    return (
      <div className="flex items-center justify-center w-10 h-10">
        <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse"></div>
      </div>
    );
  }

  return user && isLoggedIn() ? (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-200"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white flex items-center justify-center font-bold text-lg relative">
          <span className="absolute inset-0 flex items-center justify-center">
            {user?.email?.[0]?.toUpperCase() ?? 'U'}
          </span>

          <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/10"></span>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200"
      >
        <li>
          <button
            onClick={() => logoutMutation.mutateAsync()}
            disabled={logoutMutation.isPending}
            className="w-full text-left hover:bg-error/10 hover:text-error disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Выйти
          </button>
        </li>
      </ul>
    </div>
  ) : (
    <Link
      to="/login"
      className="btn btn-primary px-6 text-white hover:bg-opacity-80 transition-all"
    >
      Войти
    </Link>
  );
};

export default UserAuthWidget;
