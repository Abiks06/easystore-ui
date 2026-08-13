import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (name, email) => set({ user: { name, email } }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // unique name
    }
  )
);
