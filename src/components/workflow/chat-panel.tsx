"use client";

import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { agentApi } from "@/features/agent/api/agent.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { ApiError } from "@/lib/api-client";
import { useState } from "react";

type Msg = {role: "user" | "assistant"; content: string};

export function ChatPanel() {
  const accessToken  = useAuthStore((s) => s.accessToken);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    const content = input.trim();
    if(!content || pending) return;

    setError(null);
    setInput("");
    setMessages((m) => [...m, {role: "user", content}]);
    setPending(true);

    try{
      const res = await agentApi.chat(
        {content, conversation_id: conversationId },
        accessToken
      );
      if(!res.data) throw new Error (res.message || "No response");

      setConversationId(res.data.conversation_id);
      setMessages((m) => [
        ...m,
        {role: "assistant", content: res.data!.message},
      ]);
    } catch (e){
      const msg = e instanceof ApiError ? e.message : "Failed to send message";
      setError(msg);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="h-full min-h-0 rounded-xl border border-border bg-card flex flex-col overflow-hidden">
      <div className="h-10 px-4 border-b border-border flex items-center text-sm font-medium">
        AI collaboration chat
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 text-sm">
        {messages.length === 0 && (
          <div className="rounded-lg bg-muted/40 border border-border p-3 text-muted-foreground">
          Ask the agent anything to start a conversation.
        </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "rounded-lg bg-violet-500/10 border border-border p-3 ml-8" : "rounded-lg bg-muted/40 border border-border p-3 mr-8"}>
            {m.content}
          </div>
        ))}
        {error && <p className="text-sm text-destructive">{error}</p>}
        
      </div>

      <div className="p-3 border-t border-border flex gap-2">

        <Input placeholder="Type a message..." className="h-10"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => {if(e.key === "Enter") void send();}}
               disabled={pending} />

        <Button size="icon" className="size-10 gradient-btn shrink-0"
               onClick={() => void send()}
               disabled={pending}>
          <Send className="size-4" />
        </Button>

      </div>
    </div>
  );
}