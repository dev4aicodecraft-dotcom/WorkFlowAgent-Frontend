import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Zap } from "lucide-react";

export function TriggerNode({ data }: NodeProps) {
  return (
    <div className="min-w-[190px] rounded-xl border border-border bg-card px-3 py-2.5 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="size-7 rounded-md bg-violet-600/20 text-violet-400 flex items-center justify-center">
          <Zap className="size-3.5" />
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Trigger
          </p>
          <p className="text-sm font-medium">
            {(data.label as string) ?? "Telegram message"}
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-violet-500 !w-2.5 !h-2.5" />
    </div>
  );
}