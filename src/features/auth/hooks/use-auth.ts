"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";
import type {
  ForgotPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from "../types/auth.types";

export function useSignIn() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload: SignInPayload) => authApi.signIn(payload),
    onSuccess: (data) => {
      setSession(data.user, data.tokens.accessToken);
      router.push("/dashboard"); // later
    },
  });
}

export function useSignUp() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload: SignUpPayload) => authApi.signUp(payload),
    onSuccess: (data) => {
      setSession(data.user, data.tokens.accessToken);
      router.push("/dashboard");
    },
  });
}

export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authApi.forgotPassword(payload),
    onSuccess: (_data, variables) => {
      router.push(
        `/check-email?email=${encodeURIComponent(variables.email)}`
      );
    },
  });
}

export function useResendLink() {
  return useMutation({
    mutationFn: (email: string) => authApi.resendMagicLink(email),
  });
}