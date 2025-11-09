import {
  X,
  ChartLine,
  TicketSlash,
  MessageSquare,
  Calculator,
} from 'lucide-react';
import { sidebarMenuLinks } from '../../utils/sidebarMenuLinks';
import { MenuItemMobile } from '../MenuItemMobile';
import { useEffect, useRef } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const icons: Record<string, React.ComponentType<any>> = {
  '/dashboard': ChartLine,
  '/tickets': TicketSlash,
  '/chat-assistant': MessageSquare,
  '/plan-simulator': Calculator,
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      previousActiveElement.current = document.activeElement as HTMLElement;
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = 'unset';

      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigation = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="lg:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-50 p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      tabIndex={-1}
    >
      <div className="absolute inset-0 bg-slate-900/95 animate-fade-in" />

      <div className="relative z-10 h-full flex flex-col animate-slide-in-right">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center hover:bg-slate-700/50 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Fechar menu"
            title="Fechar menu"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <nav className="flex-1" aria-label="Navegação principal">
          <ul className="flex flex-col gap-4">
            {sidebarMenuLinks.map((item) => (
              <li key={item.link}>
                <MenuItemMobile
                  icon={icons[item.link]}
                  path={item.link}
                  name={item.name}
                  onNavigate={handleNavigation}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="pt-8 mt-auto border-t border-slate-700/50">
          <p className="text-center text-slate-400 text-sm">
            Nortus Seguros © 2025
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
