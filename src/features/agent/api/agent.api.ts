import { apiClient } from "@/lib/api-client";
import type { AgentChatRequest, AgentChatResponse, ApiResponse, ConversationMessageResponse, ConversationResponse} from "@/types/api";

export const agentApi = {

chat: (payload: AgentChatRequest, token?: string | null) =>
  apiClient<ApiResponse<AgentChatResponse>>("/agent/chat",{
    method: "POST",
    body: payload,
    token,
  }),

  listConversation: (token?: string | null) => 
    apiClient<ApiResponse<ConversationResponse[]>>("/conversations/", {
        method: "GET",
        token}),

  listMessage: (conversationId: string, token?: string | null) => 
    apiClient<ApiResponse<ConversationMessageResponse[]>>(
        `/conversations/${conversationId}/message`, {method: "GET" , token}
    ),
};