import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

export function MobileHeader({ onMenuToggle }: MobileHeaderProps) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#20273E] backdrop-blur-xl border-b border-slate-700/50 z-40 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="w-10 h-10 bg-[#20273E] rounded-xl flex items-center justify-center"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-bold bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>
      </div>
    </div>
  );
}
