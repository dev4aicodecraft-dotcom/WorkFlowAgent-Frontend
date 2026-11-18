const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string | null;
};

function getStoredToken(): string | null {
  if(typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

function clearAuthStorage(){
  if(typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("workflowagent-auth");
}

export async function apiClient<T>(
  path: string,
  { body, token, headers, ...init }: RequestOptions = {}
): Promise<T> {
  const authToken = token ?? getStoredToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  // if (!res.ok) {
  //   throw new ApiError(
  //     res.status,
  //     (data as { message?: string })?.message ?? "Request failed",
  //     data
  //   );
  // }

  if(res.status === 401){
    //clear auth (zustand clearSession / localStorage)
    clearAuthStorage();
    if(typeof window !== "undefined"){
      window.location.href = "/sign-in";
    }
    throw new ApiError(401, "Unauthorized", data);
  }

  if(!res.ok){
    throw new ApiError(
      res.status,
      (data as {message?: string})?.message ?? "Request failed",
      data
    );
  }

  return data as T;
}