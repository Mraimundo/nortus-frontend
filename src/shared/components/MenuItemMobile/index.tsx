'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

type MenuItemMobileProps = {
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  name?: string;
  onNavigate?: () => void;
};

export function MenuItemMobile(props: MenuItemMobileProps) {
  const { path, name, icon: Icon, onNavigate } = props;
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
    router.push(path);
  };

  return (
    <Link
      href={path}
      data-active={path === pathname}
      onClick={handleClick}
      className="flex items-center gap-3 justify-center w-full h-12 bg-[#2b3248] rounded-xl hover:bg-slate-700/50 transition-all hover:scale-110  data-[active=true]:bg-[#1876D2] data-[active=true]:font-semibold"
    >
      <Icon className="w-5 h-5" />
      <span>{name}</span>
    </Link>
  );
}
