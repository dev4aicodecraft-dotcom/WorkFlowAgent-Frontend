/** Shared envelope from FastAPI */
export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T | null;
    error?: {
        code: string;
        details?: {field: string; message: string}[] | null;
    } | null;
    meta?: {
        page?: number | null;
        page_size?: number | null;
        total?: number | null;
        total_pages?: number | null;
        request_id?: string | null;
    } | null;
};

/** POST /auth/login data */
export type TokenResponse = {
    access_token: string;
    refresh_token: string;
    token_type?: string;
    expires_in: number;
};

/** POST /auth/register-firm - data; GET /users/me - data */
export type UserResponse = {
    id: string;
    firm_id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: "admin" | "user";
};

/** POST /auth/register-firm body */
export type FirmRegistration = {
    first_name: string;
    last_name: string;
    address_line_one: string;
    address_line_two?: string | null;
    city: string;
    state: string;
    country: string;
    phone_number?: string | null;
    email: string;
    password: string;
    firm_name: string;
};

/** POST /auth/login body */
export type LoginRequest = {
    email: string;
    password: string;
};

/** POST /agent/chat body */
export type AgentChatRequest = {
    content: string;
    conversation_id?: string | null;
};

export type AgentStep = {
    kind: "understand" | "search" | "connections" | "execute";
    label: string;
    detail?: string | null;
};

export type ToolSearchHit = {
    slug: string;
    name: string;
    description: string;
    toolkit_slug: string;
    toolkit_name: string;
    score: number;
    is_deprecated: boolean;
    requires_connection: boolean;
    is_connected: boolean;
};

export type ToolkitNeed = {
    slug: string;
    name: string;
};

export type Usage = {
    prompt_tokens?: number;
    completion_tokens?: number;
    cost_usd?: number;
    requests?: number;
  };

/** POST /agent/chat → data (happy path) */
export type AgentChatResponse = {
    message: string;
    conversation_id: string;
    intent: "find_tools" | "chat";
    search_query?: string | null;
    steps: AgentStep[];
    tools: ToolSearchHit[];
    needs_connection: ToolkitNeed[];
    usage: Usage;
};
export type ConversationResponse = {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
};
export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};
/** GET /conversations/{id}/messages → data item */
export type ConversationMessageResponse = {
    id: string;
    conversation_id: string;
    essages: ChatMessage[]; // OpenAPI typo; keep as-is unless backend fixes it
    created_at: string;
};