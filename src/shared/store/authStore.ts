import { create } from 'zustand';
import { env } from '../../env';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  company: string;
  initials: string;
  startDate: string;
  accessLevel: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  fetchUserProfile: () => Promise<void>;
}

const BASE_URL = env.NEXT_PUBLIC_BASE_URL;

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/login.json`);
      const data = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 1100));

      if (data?.data?.accessToken) {
        document.cookie = `auth_token=${data.data.accessToken}; path=/; max-age=3600; secure; samesite=strict`;

        const userData: User = {
          id: '1',
          username: data.data.username,
          name: 'Ana Carolina Silva',
          email: 'ana.carolina@nortus.com.br',
          phone: '+55 (11) 98765-4321',
          role: 'Gerente Comercial',
          department: 'Vendas & Marketing',
          company: 'Nortus Seguros',
          initials: 'AC',
          startDate: '15/03/2022',
          accessLevel: 'Administrador',
        };

        localStorage.setItem('user', JSON.stringify(userData));
        set({
          isAuthenticated: true,
          user: userData,
          loading: false,
        });
        return true;
      } else {
        set({ loading: false, error: 'Credenciais inválidas' });
        return false;
      }
    } catch (err) {
      set({ loading: false, error: 'Erro de conexão com o servidor' });
      return false;
    }
  },

  logout: async () => {
    set({ loading: true });

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      await fetch(`${BASE_URL}/logout.json`, { method: 'POST' });
    } catch (error) {
      console.error('Erro durante logout:', error);
    } finally {
      document.cookie =
        'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      localStorage.removeItem('user');

      set({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });

      if (typeof window !== 'undefined') {
        window.location.href = 'auth/login';
      }
    }
  },

  checkAuth: () => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth_token='));
    if (token) {
      const user = localStorage.getItem('user');
      if (user) {
        set({ isAuthenticated: true, user: JSON.parse(user) });
      }
    }
  },

  fetchUserProfile: async () => {
    set({ loading: true });
    try {
      const response = await fetch(`${BASE_URL}/user-profile.json`);
      const data = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 800));

      if (data?.success) {
        const userData: User = {
          id: data.data.id,
          username: data.data.username,
          name: data.data.name,
          email: data.data.email,
          phone: data.data.phone,
          role: data.data.role,
          department: data.data.department,
          company: data.data.company,
          initials: data.data.initials,
          startDate: data.data.startDate,
          accessLevel: data.data.accessLevel,
          avatar: data.data.avatar,
        };

        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData, loading: false });
      } else {
        set({ loading: false, error: 'Erro ao carregar perfil' });
      }
    } catch (err) {
      set({ loading: false, error: 'Erro de conexão ao carregar perfil' });
    }
  },
}));
