"use client";

import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Focus, Undo2, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { TriggerNode } from "./nodes/trigger-node";
import { AgentNode } from "./nodes/agent-node";
import { ActionNode } from "./nodes/action-node";
import { useWorkflowStore } from "@/features/workflow/store/workflow.store";
import { useEffect, useState } from "react";

const nodeTypes = {
  trigger: TriggerNode,
  agent: AgentNode,
  action: ActionNode,
};

function CanvasToolbar() {
  const { fitView } = useReactFlow();
  const { nodes, selectedNodeId, onNodesChange, selectNode } = useWorkflowStore();

  return (
    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-lg">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9"
        title="Focus"
        onClick={() => fitView({ padding: 0.2, duration: 300 })}
      >
        <Focus className="size-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" className="size-9" title="Undo">
        <Undo2 className="size-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9 text-destructive"
        title="Delete"
        onClick={() => {
          if (!selectedNodeId) return;
          onNodesChange([{ type: "remove", id: selectedNodeId }]);
          selectNode(null);
        }}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

function CanvasInner() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false); 
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, selectNode } =
    useWorkflowStore();

    useEffect(() => setMounted(true), []);
    
    //Stable on server + first client paint; update after mount
    const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="relative h-full w-full bg-muted/40 dark:bg-[#0b0b10]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => selectNode(node.id)}
        onPaneClick={() => selectNode(null)}
        fitView
        proOptions={{ hideAttribution: true }}  // removes React Flow title
        className="bg-transparent"
        colorMode={isDark ? "dark" : "light"}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={18}
          size={1}
          color={isDark ? "#2a2a35" : "#c4c4d0"}
        />
        <CanvasToolbar />
      </ReactFlow>
    </div>
  );
}

export function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}