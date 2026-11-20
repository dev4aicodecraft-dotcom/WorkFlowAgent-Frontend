import "server-only";

export const serverEnv = {
  backendUrl: (process.env.BACKEND_INTERNAL_URL ?? "http://localhost:8787").replace(
    /\/$/,
    ""
  ),
  apiPrefix: "/api/v1",
} as const;