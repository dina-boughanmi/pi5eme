import { useState, useCallback, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const AUTH_STORAGE_KEY = "job_app_auth";

export const useAuth = () => {
  const [state, setState] = useState<AuthState>(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {
          isAuthenticated: false,
          user: null,
          token: null,
        };
      }
    }
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  });

  const login = useCallback((email: string, password: string) => {
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name: email.split("@")[0],
      email,
    };

    const mockToken = `mock_jwt_${Date.now()}`;

    const newState: AuthState = {
      isAuthenticated: true,
      user: mockUser,
      token: mockToken,
    };

    setState(newState);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));
    return mockUser;
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
    };

    const mockToken = `mock_jwt_${Date.now()}`;

    const newState: AuthState = {
      isAuthenticated: true,
      user: mockUser,
      token: mockToken,
    };

    setState(newState);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));
    return mockUser;
  }, []);

  const logout = useCallback(() => {
    setState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
  };
};
