"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MoreHorizontal, Share2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppHeader() {
  return (
    <div className="h-14 shrink-0 border border-border px-4 flex items-center justify-between gap-4 bg-card rounded-xl">
      <p className="text-sm text-muted-foreground">
        Workflows / AI bots /{" "}
        <span className="text-foreground font-medium">Client bot</span>
      </p>

      <div className="flex gap-6 text-sm">
        <button className="text-violet-500 border-b-2 border-violet-500 pb-3 -mb-px font-medium">
          Editor
        </button>
        <button className="text-muted-foreground pb-3">Executions</button>
        <button className="text-muted-foreground pb-3">Test</button>
      </div>

      <div className="flex items-center gap-3">
      
        <div className="flex items-center gap-2 text-sm">
          <Switch defaultChecked />
          <span>Active</span>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Share2 className="size-3.5" /> Share
        </Button>
        
        <Button size="sm" className="gradient-btn">
          Save
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="size-4" />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}