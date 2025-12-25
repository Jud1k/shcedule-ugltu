import UserAuthWidget from '@/features/auth/components/UserAuthWidget';
import { Link, Outlet } from 'react-router';
import { SlGraduation, SlEvent } from 'react-icons/sl';
import { LuHouse } from 'react-icons/lu';
import { IoMdBook } from 'react-icons/io';
import { GrGroup } from 'react-icons/gr';
import SidebarMenu from '@/components/generic/SidebarMenu';
import SidebarMenuButton from '@/components/generic/SidebarMenuButton';
import { IconType } from 'react-icons/lib';
import { useState } from 'react';

interface NavigationItem {
  id: string;
  title: string;
  icon: IconType;
  path: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'schedule',
    title: 'Расписание',
    icon: SlEvent,
    path: '/admin/schedule',
  },
  { id: 'subjects', title: 'Предметы', icon: IoMdBook, path: '/admin/subject' },
  {
    id: 'teachers',
    title: 'Преподаватели',
    icon: SlGraduation,
    path: '/admin/teacher',
  },
  { id: 'groups', title: 'Группы', icon: GrGroup, path: '/admin/group' },
  { id: 'rooms', title: 'Аудитории', icon: LuHouse, path: '/admin/room' },
];

export default function AdminLayout() {
  const [activeItem, setActiveItem] = useState<string>('dashboard');
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

      <div className="flex flex-1">
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuButton
              path={item.path}
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              isActive={item.id === activeItem}
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>

        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>

      <footer className="footer footer-center bg-base-200 text-base-content p-10">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ItsLifeBro
          </p>
        </aside>
      </footer>
    </div>
  );
}
