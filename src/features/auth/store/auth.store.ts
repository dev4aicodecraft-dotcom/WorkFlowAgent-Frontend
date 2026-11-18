"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/features/auth/types/auth.types";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken?: string | null) => void;
  setUser: (user: User | null) => void;
  setSession: (user: User | null, accessToken: string, refreshToken?: string | null) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken = null) => 
        set({ accessToken, refreshToken: refreshToken ?? null }),
      setUser: (user) => set({user}),
      setSession: (user, accessToken, refreshToken = null) => set({ user, accessToken, refreshToken: refreshToken ?? null}),
      clearSession: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    { name: "workflowagent-auth" }
  )
);