import {  Handle, Position, type NodeProps } from "@xyflow/react";

export function AgentNode({data, selected}: NodeProps) {
    const tools = (data.tools as string[] | undefined) ?? [];
    return (
        <div className={`min-w-[240px] rounded-xl border bg-card p-3 shadow-lg ${
            selected ? "border-lime-400" : "border-lime-500/60"
        }`}>
            <Handle type="target" position={Position.Left} className="!bg-violet-500 !w-2.5 !h-2.5" />
            <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-sm ">{(data.label as string) ?? "AI Agent"}</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime-500/20 text-lime-400 font-medium">Main</span>
            </div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">AI Agent Tools</p>
            <ul className="space-y-1.5 ">
                {tools.map((t, i) => (
                    <li key={t} className="rounded-md bg-muted/40 border border-border px-2 py-1.5 text-xs text-foreground/90">#{i + 1}: {t}</li>
                ))}
            </ul>
            <button className="mt-3 w-full rounded-md border border-dashed border-border py-1.5 text-xs text-violet-400 hover:bg-violet-500/10">+ Add tool</button>
            <Handle type="source" position={Position.Right} className="!bg-violet-500 !w-2.5 !h-2.5"/>
        </div>
    );
}