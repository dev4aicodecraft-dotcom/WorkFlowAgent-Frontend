import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api";

// Keep response as unknown/any until you type from OpenAPI; structure pages around data.
export const platformApi = {
  firms: () =>
    apiClient<ApiResponse<unknown[]>>("/platform/firms", { method: "GET" }),

  firm: (firmId: string) =>
    apiClient<ApiResponse<unknown>>(`/platform/firms/${firmId}`, { method: "GET" }),

  plans: () =>
    apiClient<ApiResponse<unknown[]>>("/platform/plans", { method: "GET" }),

  metrics: () =>
    apiClient<ApiResponse<unknown>>("/platform/metrics", { method: "GET" }),
};