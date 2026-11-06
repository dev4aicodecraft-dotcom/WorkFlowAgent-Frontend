import { apiClient } from "@/lib/api-client";
import type {
  AuthResponse,
  ForgotPasswordPayload,
  MessageResponse,
  SignInPayload,
  SignUpPayload,
} from "../types/auth.types";

export const authApi = {
  signIn: (payload: SignInPayload) =>
    apiClient<AuthResponse>("/auth/sign-in", {
      method: "POST",
      body: payload,
    }),

  signUp: (payload: SignUpPayload) =>
    apiClient<AuthResponse>("/auth/sign-up", {
      method: "POST",
      body: payload,
    }),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient<MessageResponse>("/auth/forgot-password", {
      method: "POST",
      body: payload,
    }),

  resendMagicLink: (email: string) =>
    apiClient<MessageResponse>("/auth/resend-link", {
      method: "POST",
      body: { email },
    }),
};