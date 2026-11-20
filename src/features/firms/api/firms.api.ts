import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  FirmResponse,
  InviteCreate,
  InviteCreated,
  InviteResponse,
  MemberResponse,
} from "@/types/api";

export const firmsApi = {
  me: () =>
    apiClient<ApiResponse<FirmResponse>>("/firms/me", { method: "GET" }),

  members: () =>
    apiClient<ApiResponse<MemberResponse[]>>("/firms/members", { method: "GET" }),

  listInvites: () =>
    apiClient<ApiResponse<InviteResponse[]>>("/firms/invites", { method: "GET" }),

  createInvite: (payload: InviteCreate) =>
    apiClient<ApiResponse<InviteCreated>>("/firms/invites", {
      method: "POST",
      body: payload,
    }),

  revokeInvite: (inviteId: string) =>
    apiClient<ApiResponse<null>>(`/firms/invites/${inviteId}`, {
      method: "DELETE",
    }),
};