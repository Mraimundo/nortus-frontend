import Image from 'next/image';
import Link from 'next/link';
import {
  ChartLine,
  TicketSlash,
  MessageSquare,
  Calculator,
  User,
  Settings,
  LogOut,
  Mail,
  Phone,
  Building,
  Calendar,
  Shield,
  Loader2,
} from 'lucide-react';
import { sidebarMenuLinks } from '../../utils/sidebarMenuLinks';
import { MenuItem } from './MenuItem';
import { useAuthStore } from '@/src/shared/store/authStore';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/shared/components/ui/tooltip';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/shared/components/ui/sheet';
import { useState } from 'react';

const icons: Record<string, React.ComponentType<any>> = {
  '/dashboard': ChartLine,
  '/ticket-management': TicketSlash,
  '/chat-assistant': MessageSquare,
  '/plan-simulator': Calculator,
};

export function Sidebar() {
  const { user, logout, loading, fetchUserProfile } = useAuthStore();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const defaultUserProfile = {
    name: 'Usuário',
    email: 'usuario@nortus.com.br',
    phone: '+55 (11) 99999-9999',
    role: 'Colaborador',
    department: 'Departamento',
    company: 'Nortus Seguros',
    initials: 'US',
    startDate: '01/01/2024',
    accessLevel: 'Usuário',
  };

  const userProfile = user
    ? { ...defaultUserProfile, ...user }
    : defaultUserProfile;

  const handleRefreshProfile = async () => {
    setIsRefreshing(true);
    try {
      await fetchUserProfile();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
    if (!user?.phone || !user?.department) {
      handleRefreshProfile();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro durante logout:', error);
    }
  };

  const handleSettings = () => {
    setIsSheetOpen(false);
  };

  return (
    <aside className="hidden lg:flex fixed rounded-3xl left-0 top-0 h-full w-32 bg-[#20273E] border-r border-slate-700/50 flex-col items-center py-6 space-y-6 z-30">
      <Link href="/" className="flex gap-4 items-center">
        <div className="rounded-md relative m-auto">
          <Image
            src="/assets/logo.png"
            alt="Ilustração de login Nortus"
            priority
            width={40}
            height={40}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col space-y-4 mt-35">
        <ul className="flex flex-col gap-6 pb-8">
          {sidebarMenuLinks.map((item) => (
            <MenuItem
              key={item.link}
              icon={icons[item.link]}
              path={item.link}
            />
          ))}
        </ul>
      </div>

      <TooltipProvider>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <Tooltip>
            <SheetTrigger asChild>
              <TooltipTrigger asChild>
                <div
                  onClick={handleOpenSheet}
                  className="w-12 h-12 bg-[#1876D2] rounded-full flex items-center justify-center text-lg font-semibold text-[#EFF6FF] cursor-pointer hover:bg-[#1565c0] transition-colors duration-200"
                >
                  {userProfile.initials}
                </div>
              </TooltipTrigger>
            </SheetTrigger>
            <TooltipContent
              side="right"
              className="bg-slate-800 border-slate-700 text-white"
            >
              <p className="text-white font-medium text-base">Perfil</p>
            </TooltipContent>
          </Tooltip>

          <SheetContent className="w-[380px] bg-linear-to-b from-slate-900 to-slate-800 border-l border-slate-700/50 text-white overflow-y-auto">
            <SheetHeader className="space-y-4 pb-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-white text-xl font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-white" />
                  Meu Perfil
                </SheetTitle>
              </div>
              <SheetDescription className="text-slate-400 text-sm">
                {isRefreshing
                  ? 'Atualizando dados...'
                  : 'Gerencie suas informações e preferências'}
              </SheetDescription>
            </SheetHeader>

            <div className="py-6 space-y-8">
              {(loading || isRefreshing) && (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#1876D2]" />
                </div>
              )}

              {!(loading || isRefreshing) && (
                <>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 bg-[#1876D2] rounded-full flex items-center justify-center font-bold text-white text-2xl shadow-xl shadow-cyan-500/20">
                      {userProfile.initials}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">
                        {userProfile.name}
                      </h3>
                      <p className="text-[#1876D2] font-medium">
                        {userProfile.role}
                      </p>
                      <div className="flex items-center justify-center gap-1 text-slate-400 text-sm">
                        <Building className="w-4 h-4" />
                        <span>{userProfile.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 px-4">
                    <h4 className="text-lg font-semibold text-white border-l-4 border-[#1876D2] pl-3">
                      Informações Pessoais
                    </h4>

                    <div className="space-y-3 bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                      <div className="flex items-center gap-3 text-slate-300">
                        <Mail className="w-4 h-4 text-[#1876D2] shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-slate-400">E-mail</p>
                          <p className="text-white text-base truncate">
                            {userProfile.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-300">
                        <Phone className="w-4 h-4 text-[#1876D2] shrink-0" />
                        <div>
                          <p className="text-sm text-slate-400">Telefone</p>
                          <p className="text-white">{userProfile.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-300">
                        <Building className="w-4 h-4 text-[#1876D2] shrink-0" />
                        <div>
                          <p className="text-sm text-slate-400">Departamento</p>
                          <p className="text-white">{userProfile.department}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-300">
                        <Calendar className="w-4 h-4 text-[#1876D2] shrink-0" />
                        <div>
                          <p className="text-sm text-slate-400">
                            Data de Início
                          </p>
                          <p className="text-white">{userProfile.startDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-300">
                        <Shield className="w-4 h-4 text-[#1876D2] shrink-0" />
                        <div>
                          <p className="text-sm text-slate-400">
                            Nível de Acesso
                          </p>
                          <p className="text-white">
                            {userProfile.accessLevel}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 px-4">
                    <h4 className="text-lg font-semibold text-white border-l-4 border-cyan-400 pl-3">
                      Estatísticas do Mês
                    </h4>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/30 hover:border-cyan-400/30 transition-colors">
                        <p className="text-2xl font-bold text-[#1876D2]">24</p>
                        <p className="text-xs text-slate-400 mt-1">Vendas</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/30 hover:border-cyan-400/30 transition-colors">
                        <p className="text-2xl font-bold text-[#10b981]">
                          R$ 42K
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Faturamento
                        </p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/30 hover:border-cyan-400/30 transition-colors">
                        <p className="text-2xl font-bold text-[#8b5cf6]">92%</p>
                        <p className="text-xs text-slate-400 mt-1">Conclusão</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/30 hover:border-cyan-400/30 transition-colors">
                        <p className="text-2xl font-bold text-[#f59e0b]">15</p>
                        <p className="text-xs text-slate-400 mt-1">Clientes</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-3 px-4 pt-4 border-t border-slate-700/50">
                <button
                  onClick={handleSettings}
                  className="w-full flex justify-center items-center gap-3 px-4 py-3 text-slate-300 bg-slate-700/50 rounded-xl transition-all duration-200 hover:translate-x-1 border border-slate-600/50"
                >
                  <Settings className="w-4 h-4 text-[#1876D2]" />
                  <span className="font-medium">Configurações</span>
                </button>

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-400 bg-red-400/10 rounded-xl transition-all duration-200 translate-x-1 border border-red-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="font-medium">Saindo...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Sair da Plataforma</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700/50">
              <p className="text-center text-slate-500 text-xs">
                Nortus Seguros © 2025
                <br />
                v1.1.0
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </TooltipProvider>
    </aside>
  );
}
