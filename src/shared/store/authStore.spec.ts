import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../store/authStore';

vi.mock('../../env', () => ({
  env: { NEXT_PUBLIC_BASE_URL: 'https://mockapi.test' },
}));

const mockFetch = vi.fn();
global.fetch = mockFetch as any;

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => (store[key] = value)),
    removeItem: vi.fn((key: string) => delete store[key]),
    clear: vi.fn(() => (store = {})),
  };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

beforeEach(() => {
  useAuthStore.setState({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  });
  vi.clearAllMocks();
  document.cookie = '';
  localStorage.clear();
});

describe('useAuthStore', () => {
  it('should initialize with default state', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should successfully login and set user data', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        data: {
          accessToken: 'mock_token',
          username: 'mockuser',
        },
      }),
    });

    const { login } = useAuthStore.getState();
    const result = await login('mock@email.com', 'password123');

    const { isAuthenticated, user, error } = useAuthStore.getState();

    expect(result).toBe(true);
    expect(isAuthenticated).toBe(true);
    expect(user?.username).toBe('mockuser');
    expect(error).toBeNull();
    expect(document.cookie).toContain('auth_token=mock_token');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should handle invalid credentials', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({}),
    });

    const { login } = useAuthStore.getState();
    const result = await login('wrong@email.com', 'invalid');

    const { isAuthenticated, error } = useAuthStore.getState();

    expect(result).toBe(false);
    expect(isAuthenticated).toBe(false);
    expect(error).toBe('Credenciais inválidas');
  });

  it('should handle login network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { login } = useAuthStore.getState();
    const result = await login('error@email.com', '123456');

    const { error } = useAuthStore.getState();

    expect(result).toBe(false);
    expect(error).toBe('Erro de conexão com o servidor');
  });

  it('should perform logout and clear session', async () => {
    useAuthStore.setState({
      isAuthenticated: true,
      user: { id: '1', username: 'mockuser' } as any,
    });
    document.cookie = 'auth_token=mock_token';
    localStorage.setItem('user', JSON.stringify({ username: 'mockuser' }));

    mockFetch.mockResolvedValueOnce({});

    const { logout } = useAuthStore.getState();
    await logout();

    const { isAuthenticated, user, loading } = useAuthStore.getState();

    expect(isAuthenticated).toBe(false);
    expect(user).toBeNull();
    expect(loading).toBe(false);
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('should checkAuth and restore user if token exists', () => {
    document.cookie = 'auth_token=mock_token';
    localStorage.setItem('user', JSON.stringify({ username: 'restoredUser' }));

    const { checkAuth } = useAuthStore.getState();
    checkAuth();

    const { isAuthenticated, user } = useAuthStore.getState();

    expect(isAuthenticated).toBe(true);
    expect(user?.username).toBe('restoredUser');
  });

  it('should fetch user profile successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: {
          id: '1',
          username: 'profileUser',
          name: 'Test User',
          email: 'test@user.com',
          phone: '123456789',
          role: 'Admin',
          department: 'IT',
          company: 'MockCorp',
          initials: 'TU',
          startDate: '2023-01-01',
          accessLevel: 'Full',
          avatar: 'mock.png',
        },
      }),
    });

    const { fetchUserProfile } = useAuthStore.getState();
    await fetchUserProfile();

    const { user, error } = useAuthStore.getState();

    expect(user?.username).toBe('profileUser');
    expect(error).toBeNull();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should handle fetchUserProfile error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { fetchUserProfile } = useAuthStore.getState();
    await fetchUserProfile();

    const { error } = useAuthStore.getState();

    expect(error).toBe('Erro de conexão ao carregar perfil');
  });
});
