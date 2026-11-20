"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WorkflowsPage() {
  return (
    <div className="flex-1 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Workflows</h1>
          <p className="text-sm text-muted-foreground">Your automation canvases.</p>
        </div>
        <Button className="gradient-btn" asChild>
          <Link href="/workflows/demo">New workflow</Link>
        </Button>
      </div>
      <Link
        href="/workflows/demo"
        className="block rounded-lg border border-border bg-card p-4 hover:bg-muted/40"
      >
        <p className="font-medium">Demo workflow</p>
        <p className="text-xs text-muted-foreground">Open the canvas editor</p>
      </Link>
    </div>
  );
}