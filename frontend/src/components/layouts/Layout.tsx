import { Link, Outlet } from 'react-router';
import UserAuthWidget from '@/features/auth/components/UserAuthWidget';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="navbar bg-green-600 shadow-sm px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Лестех
          </Link>
        </div>
        <div className="flex-none gap-4 mr-4">
          <UserAuthWidget />
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="footer footer-center bg-base-200 text-base-content p-10">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ItsLifeBro
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Layout;