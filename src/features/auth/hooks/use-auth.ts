"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";
import { mapUserResponse } from "../types/auth.types";
import type {
  ForgotPasswordPayload,
  SignInPayload,
  SignUpFormValues,
} from "../types/auth.types";
import type { FirmRegistration } from "@/types/api";

export function useSignIn() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload: SignInPayload) => authApi.signIn(payload),
    onSuccess: async (res) => {
      const tokens = res.data; //{access_token, refresh_token, expires_in}
      if(!tokens?.access_token){ throw new Error(res.message || "Login failed") };

      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);

      let user = null;
      try{
        const me = await authApi.me(tokens.access_token);
        if(me.data) user = mapUserResponse(me.data);
      } catch {

      }

      setSession(user, tokens.access_token, tokens.refresh_token);
      router.push("/workflows/demo"); // later
    },
  });
}

export function useSignUp() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (form: SignUpFormValues) => {
      const payload: FirmRegistration = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        firm_name: form.firm_name,
        address_line_one: form.address_line_one,
        address_line_two: form.address_line_two ?? null,
        city: form.city,
        state: form.state,
        country: form.country,
        phone_number: form.phone_number ?? null,
      };
      return authApi.signUp(payload);
    }, 
    onSuccess: (res) => {
      if(!res.success){
        throw new Error(res.message || "Registration failed");
      }
      // setSession(data.user, data.tokens.accessToken);
      router.push("/sign-in?registered=1");
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