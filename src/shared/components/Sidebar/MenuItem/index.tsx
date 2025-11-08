'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItemProps = {
  icon: React.ComponentType<{ className?: string }>;
  path: string;
};

export function MenuItem(props: MenuItemProps) {
  const { path, icon: Icon } = props;
  const pathname = usePathname();

  return (
    <Link
      href={path}
      data-active={path === pathname}
      className="flex items-center justify-center w-12 h-12 bg-[#2b3248] rounded-xl hover:bg-slate-700/50 transition-all hover:scale-110  data-[active=true]:bg-[#1876D2] data-[active=true]:font-semibold"
    >
      <Icon className="w-5 h-5" />
    </Link>
  );
}
