"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  loginRequest,
  registerRequest,
  getMeRequest,
} from '@/shared/api/auth.api';
import type { User } from '@/shared/api/auth.api';

import {getToken, removeToken, setToken} from "@/lib/auth/authStorage";


type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await getMeRequest(token);
        setUser(me);
      } catch {
        removeToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (identifier: string, password: string) => {
    const { jwt, user } = await loginRequest(identifier, password);

    setToken(jwt);
    setUser(user);

    await queryClient.invalidateQueries({ queryKey: ['favorites'] });
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const { jwt, user } = await registerRequest(
      username,
      email,
      password
    );

    setToken(jwt);
    setUser(user);

    await queryClient.invalidateQueries({ queryKey: ['favorites'] });
  };

  const logout = () => {
    removeToken();
    setUser(null);

    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth использвать надо внутри AuthProvider');
  return context;
};