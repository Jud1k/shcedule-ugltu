interface SidebarMenuProps {
  children: React.ReactNode;
}

export default function SidebarMenu({ children }: SidebarMenuProps) {
  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-base-200 p-4">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl font-bold">Меню</span>
      </div>
      <nav>
        <ul className="space-y-2">{children}</ul>
      </nav>
    </aside>
  );
}
