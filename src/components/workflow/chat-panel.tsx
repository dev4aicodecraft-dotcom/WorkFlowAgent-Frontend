"use client";

import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ChatPanel() {
  return (
    <div className="h-full min-h-0 rounded-xl border border-border bg-card flex flex-col overflow-hidden">
      <div className="h-10 px-4 border-b border-border flex items-center text-sm font-medium">
        AI collaboration chat
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 text-sm">
        <div className="rounded-lg bg-muted/40 border border-border p-3 text-muted-foreground">
          I can help improve this workflow. Try adding a sentiment check before
          notifying admin, or split tools into parallel branches.
        </div>
      </div>

      <div className="p-3 border-t border-border flex gap-2">
        <Input placeholder="Type a message..." className="h-10" />
        <Button size="icon" className="size-10 gradient-btn shrink-0">
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}