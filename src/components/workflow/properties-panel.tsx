"use client"

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useWorkflowStore } from "@/features/workflow/store/workflow.store";

export function PropertiesPanel() {
    const { nodes, selectedNodeId, selectNode } = useWorkflowStore();
    const node = nodes.find((n) => n.id === selectedNodeId);

    if (!node) {
        return (
            <aside className="h-full min-h-0 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                Select a node
            </aside>
        );
    }

    return (
        <aside className="h-full min-h-0 rounded-xl border border-border bg-card flex flex-col overflow-hidden">
            <div className="h-12 px-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">Properties</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime-500/20 text-lime-400">ID: {node.id}</span>
                </div>
                <Button variant="ghost" size="icon" className="size-7" onClick={() => selectNode(null)}><X className="size-4" /></Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-2">
                    <Label>Node Name</Label>
                    <Input defaultValue={String(node.data.label ?? "")} className="h-10" />
                </div>

                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea defaultValue="Orchestrates tools and decides next actions for the workflow." className="min-h-24" />
                </div>

                <div className="space-y-2">
                    <Label>Chat Model</Label>
                    <Input defaultValue="GPT-4o" className="h-10" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label>Max iterations</Label>
                        <Input defaultValue="10" className="h-10" />
                    </div>
                    <div className="space-y-2">
                        <Label>Memory limit</Label>
                        <Input defaultValue="50k tokens" className="h-10" />
                    </div>
                </div>
            </div>
        </aside>
    );
}