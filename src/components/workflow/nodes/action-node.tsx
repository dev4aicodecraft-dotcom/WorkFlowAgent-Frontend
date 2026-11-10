import { Handle, Position, type NodeProps } from "@xyflow/react";

export function ActionNode({ data }: NodeProps) {
  return (
    <div className="min-w-[170px] rounded-xl border border-border bg-card px-3 py-2.5 shadow-lg">
      <Handle type="target" position={Position.Left} className="!bg-violet-500 !w-2.5 !h-2.5" />
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
        Action
      </p>
      <p className="text-sm font-medium">
        {(data.label as string) ?? "Action"}
      </p>
    </div>
  );
}