import { apiClient } from "@/lib/api-client";
import type { ForgotPasswordPayload, MessageResponse } from "../types/auth.types";
import type { ApiResponse, FirmRegistration, LoginRequest, TokenResponse, UserResponse, InviteAcceptance, InviteLookupResponse} from "@/types/api"

export const authApi = {
  signIn: (payload: LoginRequest) =>
    apiClient<ApiResponse<TokenResponse>>("/auth/login", {
      method: "POST",
      body: {email: payload.email, password: payload.password},
    }),

  signUp: (payload: FirmRegistration) =>
    apiClient<ApiResponse<UserResponse>>("/auth/register-firm", {
      method: "POST",
      body: payload,
    }),

  me: (token: string) => 
    apiClient<ApiResponse<UserResponse>>("/users/me",{
      method: "GET",
      token,
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

  lookupInvite: (token: string) => 
    apiClient<ApiResponse<InviteLookupResponse>>("/auth/invites/lookup", {
      method: "POST",
      body: { token },
    }),

  acceptInvite: (payload: InviteAcceptance) => 
    apiClient<ApiResponse<UserResponse>>("/auth/invites/accept", {
      method: "POST",
      body: payload,
    }),

};