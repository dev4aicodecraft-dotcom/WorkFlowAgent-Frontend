"use client"

import { create } from  "zustand";
import { type Node, type Edge, applyNodeChanges, applyEdgeChanges, type OnNodesChange, type OnEdgesChange, type OnConnect, addEdge, MarkerType} from "@xyflow/react";

type State = {
    nodes: Node[];
    edges: Edge[];
    selectedNodeId: string | null;
    selectNode: (id: string | null) => void;
    onNodesChange : OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
};

const initialNodes: Node[] = [
    {
        id: "trigger-1",
        type: "trigger",
        position: {x: 40, y: 180},
        data: {label: "Telegram message"},
    },
    {
        id: "agent-1",
        type: "agent",
        position: {x: 320, y: 120},
        data: { label: "AI Agent", tools: ["CRM lookup", "Web search", "Calculator", "Chat history"]},
    },
    {
        id: "action-1",
        type: "action",
        position: {x: 680, y: 40},
        data: {label: "Create new task"},
    },
    {
        id: "action-2",
        type: "action",
        position: {x: 680, y: 160},
        data: {label: "Notify admin"},
    },
    {
        id: "action-3",
        type: "action",
        position: {x: 680, y: 280},
        data: {label: "Write the answer"},
    },
];

const edgeStyle = {
    stroke: "#7c3aed",
    strokeWidth: 2,
};

const initialEdges: Edge[] = [
    {
        id: "e-trigger-agent",
        source: "trigger-1",
        target: "agent-1",
        style: edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#7c3aed"},
    },
    {
        id: "e-agent-a1",
        source: "agent-1",
        target: "action-1",
        style: edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#7c3aed"},
    },
    {
        id: "e-agent-a2",
        source: "agent-1",
        target: "action-2",
        style: edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#7c3aed"},
    },
    {
        id: "e-agent-a3",
        source: "agent-1",
        target: "action-3",
        style: edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#7c3aed"},
    },
];

export const useWorkflowStore = create<State>((set, get) => ({
    selectedNodeId: "agent-1",
    selectNode: (id) => set({ selectedNodeId: id}),
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes) => set({nodes: applyNodeChanges(changes, get().nodes) }),
    onEdgesChange: (changes) => set({edges : applyEdgeChanges(changes, get().edges) }),
    onConnect: (connection) => set({edges : addEdge({...connection, 
        style: edgeStyle,
        markerEnd: {type: MarkerType.ArrowClosed, color: "#7c3aed"},
    }, get().edges) }),

})) ;