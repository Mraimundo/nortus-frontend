'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function DefaultIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type MenuItemProps = {
  icon: React.ComponentType<{ className?: string }> | undefined;
  path: string;
};

export function MenuItem(props: MenuItemProps) {
  const { path, icon: Icon } = props;
  const pathname = usePathname();

  const IconComponent = Icon || DefaultIcon;

  return (
    <Link
      href={path}
      data-active={path === pathname}
      className="flex items-center justify-center w-12 h-12 bg-[#2b3248] rounded-xl hover:bg-slate-700/50 transition-all hover:scale-110 data-[active=true]:bg-[#1876D2] data-[active=true]:font-semibold"
    >
      <IconComponent className="w-5 h-5" />
    </Link>
  );
}
