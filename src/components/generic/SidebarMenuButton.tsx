import { Link } from 'react-router';

interface SidebarMenuButtonProps {
  isActive: boolean;
  children: React.ReactNode;
  path: string;
  onClick: () => void;
}

export default function SidebarMenuButton({
  isActive,
  children,
  path,
  onClick,
}: SidebarMenuButtonProps) {
  return (
    <li>
      <Link
        to={path}
        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
          isActive ? 'bg-base-300 font-semibold' : 'hover:bg-base-300'
        }`}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
}
