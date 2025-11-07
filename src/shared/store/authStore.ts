import { create } from 'zustand';
import { env } from '@/src/env';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
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
        localStorage.setItem(
          'user',
          JSON.stringify({ username: data.data.username }),
        );
        set({
          isAuthenticated: true,
          user: { username: data.data.username },
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

  logout: () => {
    document.cookie =
      'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
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
}));
